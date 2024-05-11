package edu.grupa2.strzelnica.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Jwts;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JWTGenerator {

    public String generateToken(Authentication auth) {
        String email = auth.getName();
        Date now = new Date();
        Date expiration = new Date(now.getTime() + SecurityConstants.JWT_TOKEN_EXPIRATION_TIME);

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(expiration)
                .signWith(getKeyFromToken())
                .compact();
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getKeyFromToken())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claims.getSubject();
    }

    public SecretKey getKeyFromToken() {
        byte[] keyBytes = Decoders.BASE64.decode(SecurityConstants.JWT_SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public boolean validateToken(String token) {
        try{
            Jwts.parser().verifyWith(getKeyFromToken());
            return true;
        }catch(SignatureException e){
            throw new BadCredentialsException("Invalid JWT signature");
        }
    }
}
