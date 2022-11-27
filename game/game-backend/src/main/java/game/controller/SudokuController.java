package game.controller;

import game.model.Classement;
import game.model.Difficulte;
import game.model.Grid;
import game.model.Player;
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

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.Arrays;
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
    public Grid generate(@PathVariable("level") final String level) throws IOException {



        System.out.println("recu");
        int[] a;
        final int index = this.memoryService.getCurrentIndex();

        final URL generator = new URL("https://sudoku.diverse-team.fr/sudoku-provider/" + this.memoryService.difficultMap.get(level));
        final URLConnection yc = generator.openConnection();

        InputStream is = null;
        try {
            is = yc.getInputStream();
            final BufferedReader in = new BufferedReader(new InputStreamReader(is));
            final String ligne2Sudok;
            if (in.readLine() != null) {
                ligne2Sudok = in.readLine();
            } else {
                ligne2Sudok = "";
            }
            a = ligne2Sudok.chars().toArray();
            final ArrayList<Integer> da = Arrays.stream(a).map(lat -> lat - 48).collect(ArrayList::new, ArrayList::add,
                    ArrayList::addAll);
            final String level2;
            System.out.println("caca = " + da);
            if ("very-hard".equals(level)) {
                level2 = "very_hard";
            } else {
                level2 = level;
            }
            a = da.stream().mapToInt(i -> i).toArray();
            final Grid b = new Grid(index, new Classement(),
                    Difficulte.valueOf(level2.toUpperCase()), a);
            System.out.println(b);
            this.memoryService.addGrid(b);
            return b;
        }
        finally {
            try {
                if (is != null) {
                    is.close();
                }
            }
                catch (IOException e){
                    e.printStackTrace();
                }


            }

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
        final ArrayList<Grid> b = this.memoryService.getList(level);
        return b;
    }

    @GetMapping(path = "/getallgrids",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ArrayList<Grid> getallgrids() {
        final ArrayList<Grid> gridList = new ArrayList<Grid>();
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
    public Grid getById(@PathVariable("id") final String id) {

        final Grid b = this.memoryService.getGrid(Integer.parseInt(id));
        if (b == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "entity not found"
            );
        }
        System.out.println("Grid number " + id + " asked");
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
