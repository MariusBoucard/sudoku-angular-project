package game.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Getter
@Setter
@ToString
public class Player implements Serializable {
    String name;
    int score;
public Player(){}

    /**
     * Contructor sith parameter initialisation
     * @param n
     * @param sc
     */
    public Player(String n, int sc){
        this.name=n;
        this.score=sc;
    }
}
