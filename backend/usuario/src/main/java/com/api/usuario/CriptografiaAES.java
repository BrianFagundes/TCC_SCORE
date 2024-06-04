package com.api.usuario;

import org.springframework.stereotype.Service;
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Service
public class CriptografiaAES {

    private static final String ALGORITHM = "AES";
    private static final byte[] KEY = "Wo3@ATDst6dAgAqr".getBytes();

    public String criptografar(String valor) {
        try {
            SecretKey secretKey = new SecretKeySpec(KEY, ALGORITHM);
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
            byte[] valorCriptografado = cipher.doFinal(valor.getBytes());
            return Base64.getEncoder().encodeToString(valorCriptografado);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao criptografar", e);
        }
    }

    public static String descriptografar(String valorCriptografado) {
        try {
            SecretKey secretKey = new SecretKeySpec(KEY, ALGORITHM);
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, secretKey);
            byte[] valorDescriptografado = cipher.doFinal(Base64.getDecoder().decode(valorCriptografado));
            return new String(valorDescriptografado);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao descriptografar", e);
        }
    }
}
