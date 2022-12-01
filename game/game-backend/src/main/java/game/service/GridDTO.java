package game.service;

import game.model.Classement;
import game.model.Difficulte;
import game.model.Grid;
import game.model.Tile;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GridDTO {
    int id;
    Classement classement;
    Difficulte difficulte;
    Tile[] values = new Tile[81];

    public GridDTO(final Grid grid) {
        id = grid.getId();
        classement = grid.getClassement();
        difficulte = grid.getDifficulte();
        values = grid.getValues();
    }
}
