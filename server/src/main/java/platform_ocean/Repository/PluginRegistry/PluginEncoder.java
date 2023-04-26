package platform_ocean.Repository.PluginRegistry;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.ByteBuffer;
import java.util.Arrays;

public class PluginEncoder {
    public static String generateFilePath(String pluginName) {
        String serverLoc = System.getProperty("user.dir");
        String pluginFolderLoc = serverLoc + "/src/main/plugins/";
        String pluginLoc = pluginFolderLoc + pluginName + ".zip";
        return pluginLoc;
    }

    public static byte[] intToByteArray(int value) {
        return new byte[] {
                (byte) (value >>> 24),
                (byte) (value >>> 16),
                (byte) (value >>> 8),
                (byte) value };
    }

    public static byte[] encodePlugin(String pluginName) throws IOException {
        String filePathString = PluginEncoder.generateFilePath(pluginName);
        String fileName = pluginName + ".zip";
        Path filePath = Paths.get(filePathString);

        byte[] fileNameByte = fileName.getBytes();
        byte[] fileNameLen = intToByteArray(fileNameByte.length);

        byte[] fileData = Files.readAllBytes(filePath);

        byte[] clientData = new byte[4 + fileNameByte.length + fileData.length];

        System.arraycopy(fileNameLen, 0, clientData, 0, 4);
        System.arraycopy(fileNameByte, 0, clientData, 4, fileNameByte.length);
        System.arraycopy(fileData, 0, clientData, 4 + fileNameByte.length, fileData.length);

        return clientData;

    }

    public static void decodePlugin(byte[] encodedData) throws IOException {

        System.out.println("Decoding plugin of length: " + encodedData.length + " bytes.");

        byte[] fileNameLen = Arrays.copyOfRange(encodedData, 0, 4);
        int fileSize = ByteBuffer.wrap(fileNameLen).getInt();
        byte[] fileNameBytes = Arrays.copyOfRange(encodedData, 4, fileSize + 4);
        String fileName = new String(fileNameBytes);
        byte[] fileBytes = Arrays.copyOfRange(encodedData, fileSize + 4, encodedData.length);
        String newDir = Paths.get("").toAbsolutePath().toString();
        String reconstructedFilePath = newDir + "/src/main/test/" + fileName;

        try (FileOutputStream stream = new FileOutputStream(reconstructedFilePath)) {
            stream.write(fileBytes);
        }

    }

    public static void main(String args[]) throws IOException {

        byte[] encoding = PluginEncoder.encodePlugin("Subtitler");
        PluginEncoder.decodePlugin(encoding);
    }

}
