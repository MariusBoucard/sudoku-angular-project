package game.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Getter
@Setter
@ToString
public class Tile implements Serializable {
    int value;
    Tile() { }
    Tile(final int val) {
        value = val;
    }
}
