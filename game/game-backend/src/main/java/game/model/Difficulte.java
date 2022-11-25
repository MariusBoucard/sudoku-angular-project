package game.model;

import lombok.Getter;
import lombok.ToString;

import java.io.Serializable;

/**
 * Little Enum, permetting to select difficulty of the Sudokugrid
 */
@Getter
@ToString
public enum Difficulte implements Serializable {

    EASY("EASY"), MEDIUM("MEDIUM"), HARD("HARD"), VERY_HARD("VERY_HARD"), EXTREMELY_HARD("EXTREMENLY_HARD"), INSANELY_HARD("INSANELY_HARD");

    Difficulte(String easy) {
    }
}
