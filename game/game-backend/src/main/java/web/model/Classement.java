package web.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.util.ArrayList;
@Getter
@Setter
@ToString
public class Classement implements Serializable {
    ArrayList<Player> classement;

    public Classement(ArrayList<Player> classment){
        this.classement = classment;
    }
    public Classement(){
        this.classement = new ArrayList<Player>();
    }

    /**
     * Allows to add player p to this classement
     * @param p
     */

    public void add(Player p){
        this.classement.add(p);
    }

    /**
     * Remove player p from the current classement -> can be interessant but for the MemoryService
     * @param p
     */
    public void remove(Player p){
        this.classement.remove(p);
    }
}

