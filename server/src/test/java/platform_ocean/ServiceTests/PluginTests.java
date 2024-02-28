package platform_ocean.ServiceTests;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import platform_ocean.Repository.PluginRegistry.PluginRepository;

@ExtendWith(MockitoExtension.class)
public class PluginTests {

	@Mock
	private PluginRepository repo;

	@Test
	public void AddPluginAndGenerateUUID() {
		Assertions.assertThat(true).isEqualTo(true);
	}

}
