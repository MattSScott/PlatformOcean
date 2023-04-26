package platform_ocean.Entities.PluginRegistry;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "PLUGINS")
public class PluginStore {

	@Id
	private final UUID PLUGIN_KEY;

	private final String developerName;
	private final String pluginName;
	private String filePath;

	public PluginStore(String developer, String pluginName) {
		this.PLUGIN_KEY = UUID.randomUUID();
		this.developerName = developer;
		this.pluginName = pluginName;
	}

	public PluginStore() {
		this.PLUGIN_KEY = UUID.randomUUID();
		this.developerName = null;
		this.pluginName = null;
	}

	public UUID getPLUGIN_KEY() {
		return PLUGIN_KEY;
	}

	public String getDeveloperName() {
		return developerName;
	}

	public String getPluginName() {
		return pluginName;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

}
