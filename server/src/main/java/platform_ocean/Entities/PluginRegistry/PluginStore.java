package platform_ocean.Entities.PluginRegistry;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = PluginStore.TABLE_NAME)
public class PluginStore {

    public static final String TABLE_NAME = "PLUGINS";

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID pluginKey;

    private final UUID pluginName;

    public PluginStore(UUID pluginName) {
        this.pluginName = pluginName;
    }

    public PluginStore() {
        this.pluginName = null;
    }

    public UUID getPluginKey() {
        return pluginKey;
    }

    public UUID getPluginName() {
        return pluginName;
    }


    public interface PluginData {
        UUID getPluginKey();

        UUID getPluginName();
    }

}
