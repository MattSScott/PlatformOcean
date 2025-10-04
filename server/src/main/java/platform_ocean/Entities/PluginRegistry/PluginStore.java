package platform_ocean.Entities.PluginRegistry;

import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = PluginStore.TABLE_NAME)
public class PluginStore {

    public static final String TABLE_NAME = "PLUGINS";

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID pluginKey;

    private final UUID pluginName;

    private List<UUID> subscriptions;

    public PluginStore(UUID pluginName, List<UUID> subscriptions) {
        this.pluginName = pluginName;
        this.subscriptions = subscriptions;
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

    public List<UUID> getSubscriptions() {return subscriptions;}


    public interface PluginData {
        UUID getPluginKey();

        UUID getPluginName();

        List<UUID> getSubscriptions();
    }

}
