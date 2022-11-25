package game.model;

import lombok.Getter;
import lombok.ToString;

import java.io.Serializable;

@Getter
@ToString
public class Tile implements Serializable {
    int value;
    Tile(int val){
        value=val;
    }
}
