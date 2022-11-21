package game.controller;

import game.model.Classement;
import game.model.Difficulte;
import game.model.Grid;
import game.model.Player;
import game.service.MemoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.ArrayList;

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
    public Grid generate(@PathVariable("level") final String level) throws IOException {


        System.out.println("recu");
        int[] a = new int[SUDOKU_SIZE];
      /*  for (int i = 0; i < SUDOKU_SIZE; i++) {
            a[i] = 6;
        }*/
        int index = this.memoryService
                .getCurrentIndex();
        Grid b = new Grid(index, new Classement(),
                Difficulte.valueOf(level), a);
        System.out.println(b);
        this.memoryService.addGrid(b);
        return b;
    }

    /**
     * Helloword function, I could have make
     * it insult us, but it would have been too dirty.
     *
     * @return a string.
     */
    @GetMapping(path = "/", produces = MediaType.TEXT_PLAIN_VALUE)
    public String sudokuList() {
        return "Hello";
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
    public ArrayList<Grid> sudokuList(
            @PathVariable("level") final String level) {
        ArrayList<Grid> b = this.memoryService.getList(level);
        return b;
    }

    /**
     * This route return a grid corresponding to the id provided in parameter
     *
     * @param id
     * @return Grid qui correspond à l'id
     */
    @GetMapping(path = "/sudokugrid/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Grid getById(@PathVariable("id") final String id) {

        Grid b = this.memoryService.getGrid(Integer.parseInt(id));
        if (b == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "entity not found"
            );
        }
        return b;
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
