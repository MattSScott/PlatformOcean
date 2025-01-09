package platform_ocean.Repository.PluginRegistry;

import java.io.*;
import java.nio.ByteBuffer;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class PluginEncoder {

    public static String generateFilePath(String pluginName) {
        String serverLoc = System.getProperty("user.dir");
        String pluginFolderLoc = serverLoc + "/../plugins/";
        String pluginLoc = pluginFolderLoc + pluginName + ".zip";
        return pluginLoc;
    }

    public static byte[] intToByteArray(int value) {
        return new byte[]{(byte) (value >>> 24), (byte) (value >>> 16), (byte) (value >>> 8), (byte) value};
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
        // byte[] fileNameBytes = Arrays.copyOfRange(encodedData, 4, fileSize + 4);
        // String fileName = new String(fileNameBytes);
        byte[] fileBytes = Arrays.copyOfRange(encodedData, fileSize + 4, encodedData.length);
        String currDir = Paths.get("").toAbsolutePath().toString();
        String reconstructedFilePath = currDir + "/../client/src/plugins/";
        InputStream bytesToZip = new ByteArrayInputStream(fileBytes);

        PluginEncoder.unzip(bytesToZip, reconstructedFilePath);

    }

    private static void unzip(InputStream bytesToUnzip, String destDir) throws IOException {

        ZipInputStream zipFileBytes = new ZipInputStream(bytesToUnzip);
        ZipEntry entry = null;
        boolean firstEntry = true;
        while ((entry = zipFileBytes.getNextEntry()) != null) {
            File fileName = new File(destDir + "/" + entry.getName());

            if (firstEntry) {
                firstEntry = false;
                if (!fileName.exists()) {
                    fileName.mkdir();
                }
                continue;
            }
            System.out.println("entry: " + entry);

            FileOutputStream stream = new FileOutputStream(fileName);
            for (int c = zipFileBytes.read(); c != -1; c = zipFileBytes.read()) {
                stream.write(c);
            }
            zipFileBytes.closeEntry();
            stream.close();
        }
        zipFileBytes.close();

    }

    public static void main(String[] args) throws IOException {

        byte[] encoding = PluginEncoder.encodePlugin("Coords");
        PluginEncoder.decodePlugin(encoding);
    }

}
