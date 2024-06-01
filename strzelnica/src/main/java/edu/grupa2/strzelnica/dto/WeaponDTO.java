package edu.grupa2.strzelnica.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
@Getter
@Setter
public class WeaponDTO implements Serializable {
    private Integer id;
    private String name;
    private Integer usesSinceLastMaintenance;
    private Integer maintenanceEvery;
    private Boolean fitForUse;
    private BigDecimal pricePerHour;
    private Boolean inMaintenance;
    private String serialNumber;
}
