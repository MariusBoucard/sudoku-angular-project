package game.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Just the grid, this object carry (almost?) all he needs as dependency
 */
@Getter
@Setter
@ToString
public class Grid implements Serializable {
    private static final long serialVersionUID = -5756298698047880134L; //-1584223699423688446L
    int id;
    Classement classement;
    Difficulte difficulte;
    Tile[] values = new Tile[81];

    /**
     * Constructeur without argument, usefull for serialization
     */
    public Grid() {

    }

    /**
     * Constructor with initialisation for every attribute
     *
     * @param id
     * @param classement
     * @param diff
     * @param values
     */
    public Grid(final int id, final Classement classement, final Difficulte diff, final int[] values) {
        this.id = id;
        this.classement = classement;
        this.difficulte = diff;
        final List<Tile> a = new ArrayList<Tile>();
        Arrays.stream(values).forEach(val -> {
            a.add(new Tile(val));
        });
        this.values = a.toArray(new Tile[a.size()]);
    }

    /**
     * Here we don't care about having the some player with same name
     *
     * @param player
     */
    public void addScore(final Player player) {
            final List<Player> classm = classement.getClassement();
                if(classement.getClassement().stream().filter(a -> a.name == player.name && a.score >= player.score).count() == 0) {
                    final List<Player> list  = classement.getClassement().stream().filter(a -> a.name == player.name).collect(Collectors.toList());
                    list.forEach(elem ->  classm.remove(elem));
                    classement.setClassement((ArrayList<Player>) classm);
                    classement.add(player);
                }
    }



}
