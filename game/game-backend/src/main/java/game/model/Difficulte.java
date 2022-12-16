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

    EASY("EASY"), MEDIUM("MEDIUM"), HARD("HARD"), VERY_HARD("VERY-HARD"), INSANE("INSANE"), INHUMAN("INHUMAN");

    Difficulte(final String easy) {

    }
}
