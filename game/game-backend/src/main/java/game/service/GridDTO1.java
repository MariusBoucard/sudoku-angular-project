package game.service;

import game.model.Difficulte;
import game.model.Grid;
import game.model.Tile;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GridDTO1 {
    int id;
    Difficulte difficulte;
    Tile[] values;

    public GridDTO1(final Grid grid) {
        id = grid.getId();
        difficulte = grid.getDifficulte();
        values = grid.getValues();
    }
}
