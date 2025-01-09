package platform_ocean.Entities.PluginRegistry;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.UUID;

@Entity
@Table(name = PluginStore.TABLE_NAME)
public class PluginStore {

    public static final String TABLE_NAME = "PLUGINS";

    @Id
    private final UUID pluginKey = UUID.randomUUID();

    private final String pluginName;
    private final String pluginURL;


    public PluginStore(String pluginName, String url) {
        this.pluginName = pluginName;
        this.pluginURL = url;
    }

    public PluginStore() {
        this.pluginName = null;
        this.pluginURL = null;
    }

    public UUID getPluginKey() {
        return pluginKey;
    }

    public String getPluginName() {
        return pluginName;
    }

    public String getPluginURL() {
        return pluginURL;
    }


    public interface PluginData {
        UUID getPluginKey();

        String getPluginName();

        String getPluginURL();
    }

}
