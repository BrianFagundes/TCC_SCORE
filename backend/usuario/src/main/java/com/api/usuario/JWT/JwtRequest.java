package com.api.usuario.JWT;

public class JwtRequest {
    private String username;
    private String password;
    private String username2;
    private String password2;

    // Construtores
    public JwtRequest() {
    }

    public JwtRequest(String username, String password, String username2, String password2) {
        this.username = username;
        this.password = password;
        this.username2 = username2;
        this.password2 = password2;
    }

    // Getters e Setters
    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

	public String getUsername2() {
		return username2;
	}

	public void setUsername2(String username2) {
		this.username2 = username2;
	}

	public String getPassword2() {
		return password2;
	}

	public void setPassword2(String password2) {
		this.password2 = password2;
	}
}

