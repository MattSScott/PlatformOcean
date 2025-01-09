package platform_ocean.Entities.Surfer;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serial;
import java.util.Collection;
import java.util.Collections;
import java.util.UUID;

@Entity
@Table
public class Surfer implements UserDetails {

    public enum Role {
        OWNER, USER,
    }

    @Id
    private final UUID userID;
    private String username;
    private String password;
    private Boolean locked = false;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Serial
    private static final long serialVersionUID = 1L;

    public Surfer(String username, String password, Role role) {
        this.userID = UUID.randomUUID();
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public Surfer() {
        this.userID = UUID.randomUUID();
        this.role = Role.USER;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public UUID getUserID() {
        return userID;
    }

    public void elevatePrivileges() {
        this.role = Role.OWNER;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role.name());
        return Collections.singletonList(authority);

    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void lockAccount() {
        this.locked = true;
    }

}
