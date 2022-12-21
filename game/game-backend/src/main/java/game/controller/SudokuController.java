package game.controller;

import game.model.Difficulte;
import game.model.Grid;
import game.model.Player;
import game.service.GridDTO;
import game.service.GridDTO1;
import game.service.MemoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.server.ResponseStatusException;


import java.io.IOException;

import java.util.ArrayList;

import java.util.EnumSet;


@RestController
@RequestMapping("api/")
public class SudokuController {

    /**
     * Global variable for sudoku size.
     */
    private static final int SUDOKU_SIZE = 81;
    /**
     * Service that manage the memory.
     */
    private final MemoryService memoryService;


    /**
     * Constructor with dependency injection (To manage memory).
     *
     * @param memo
     */
    public SudokuController(final MemoryService memo) {
        super();
        this.memoryService = memo;
    }

    /**
     * generategrid/{level} route : allow user to generate a grid,
     * from M. Blouin's Service. For the moment, it only
     * send a 666 satanist grid
     *
     * @param level Difficulty of the Game
     * @return The grid just generated
     * @throws IOException
     */
    @GetMapping(path = "/generategrid/{level}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public GridDTO generate(@PathVariable("level") final String level) throws IOException {
        if(this.memoryService.difficultMap.get(level) != null) {
            final GridDTO a = this.memoryService.generateGrid(level);
            System.out.println(a.toString());
            System.out.println("foundddd");
            return a;
        } else {
            System.out.println("on a pas trouvé");
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "On a pas trouvé de niveau bro <3 force a toi"
            );
        }

    }


    /**
     * Helloword function, I could have make
     * it insult us, but it would have been too dirty.
     *
     * @return a string.
     */
    @GetMapping(path = "/", produces = MediaType.TEXT_PLAIN_VALUE)
    public String helloworld() {
        return "hello";
    }

    /**
     * Just reload the data from textfile
     */
    @GetMapping(path = "/load", produces = MediaType.TEXT_PLAIN_VALUE)
    public void load() {
        memoryService.loadData();

    }

    /**
     * This route allow us to get already
     * generated grids corresponding to a difficulty
     *
     * @param level : Diffculty of the grids we want to get
     * @return The list of all grids corresponding of choosed level
     */
    @GetMapping(path = "/sudokulist/{level}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ArrayList<GridDTO1> sudokuList(
            @PathVariable("level") final String level) {
        final ArrayList<GridDTO1> b = this.memoryService.getList(level);
        return b;
    }

    @GetMapping(path = "/getallgrids",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ArrayList<GridDTO1> getallgrids() {
        final ArrayList<GridDTO1> gridList = new ArrayList<GridDTO1>();
        EnumSet.allOf(Difficulte.class)
                .forEach(diff -> {
                    if(this.memoryService.getList(diff.name()) != null) {
                        gridList.addAll(this.memoryService.getList(diff.name()));
                    }
                }
                    );
        return gridList;
    }

    /**
     * This route return a grid corresponding to the id provided in parameter
     *
     * @param id
     * @return Grid qui correspond à l'id
     */
    @GetMapping(path = "/sudokugrid/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public GridDTO getById(@PathVariable("id") final String id) {

        final Grid b = this.memoryService.getGrid(Integer.parseInt(id));
        if (b == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "entity not found"
            );
        }
        System.out.println("Grid number " + id + " asked");
        return new GridDTO(b);
    }

    /**
     * tHIS POST ROUTE allow us to store a player
     * in the grid -> So it's current score is added to the classement. So
     * we have to do this in the end of game.
     *
     * @param player
     * @param id
     * @throws IOException
     */
    @PostMapping(path = "/addscore/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addScore(@RequestBody final Player player,
                         @PathVariable("id") final String id) throws IOException {
        memoryService.addScore(id, player);
    }
}
