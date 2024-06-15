package edu.grupa2.strzelnica.security;

import edu.grupa2.strzelnica.models.CustomUserDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.GrantedAuthority;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JWTGenerator {

    public String generateToken(Authentication auth) {
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        String email = userDetails.getUsername();
        Long id = userDetails.getId();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        System.out.println("Roles during token generation: " + roles.toString());
        
        Date now = new Date();
        Date expiration = new Date(now.getTime() + SecurityConstants.JWT_TOKEN_EXPIRATION_TIME);

        return Jwts.builder()
                .subject(email)
                .claim("id", id)
                .claim("roles", roles)
                .issuedAt(new Date())
                .expiration(expiration)
                .signWith(getKeyFromToken())
                .compact();
    }

    public Long getIdFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getKeyFromToken())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claims.get("id", Long.class);
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
    public List<String> getRolesFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getKeyFromToken())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        List<String> roles = claims.get("roles", List.class);
        System.out.println("Roles extracted from token: " + roles);
        return roles;
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
