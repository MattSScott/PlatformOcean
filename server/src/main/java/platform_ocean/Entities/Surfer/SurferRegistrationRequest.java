package platform_ocean.Entities.Surfer;

public class SurferRegistrationRequest {
    private final String username;
    private final String password;

    public SurferRegistrationRequest() {
        username = null;
        password = null;
    }

    public SurferRegistrationRequest(String un, String pw) {
        username = un;
        password = pw;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

}
