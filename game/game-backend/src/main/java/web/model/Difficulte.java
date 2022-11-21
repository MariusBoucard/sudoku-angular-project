package web.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

/**
 * Little Enum, permetting to select difficulty of the Sudokugrid
 */
@Getter
@ToString
public enum Difficulte implements Serializable {

    EASY,MEDIUM,HARD,VERY_HARD,EXTREMELY_HARD,INSANELY_HARD
}
