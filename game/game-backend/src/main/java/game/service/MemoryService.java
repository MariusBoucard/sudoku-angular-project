package game.service;

import game.model.Classement;
import game.model.Difficulte;
import game.model.Grid;
import game.model.Player;
import org.springframework.stereotype.Service;

import java.io.IOException;

import java.net.URI;


import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toCollection;

@Service
public class MemoryService {
    Map<Difficulte, ArrayList<Grid>> gridMap = new HashMap<>();
    final  SavingService savingService = new SavingService();

    public final Map<String, String> difficultMap = new HashMap<>();
    int index = 0;

    MemoryService() {
        loadData();
        difficultMap.put("easy", "easy");
        difficultMap.put("medium", "medium");
        difficultMap.put("hard", "hard");
        difficultMap.put("very-hard", "very_hard");
        difficultMap.put("insane", "insane");
        difficultMap.put("inhuman", "inhuman");

    }

    public void loadData() {
        this.gridMap = savingService.loadFromFile();
        //GridMap  =
        final Stream<Grid> stream = allGridsStream();
        index = (int) stream.count();

        System.out.println("Gridmaaappp :" + this.gridMap);

    }

    private void saveData() throws IOException {
        savingService.saveOnFile(gridMap);
        final Stream<Grid> stream = allGridsStream();
        index = (int) stream.count();
    }

    public void addGrid(final Grid grid) throws IOException {
        ArrayList<Grid> a = gridMap.get(grid.getDifficulte());
        if (a == null) {
            a = new ArrayList<Grid>();
        }
        a.add(grid);
        this.gridMap.put(grid.getDifficulte(), a);
        saveData();
    }

    public ArrayList<GridDTO1> getList(final String diff) {
        final ArrayList<Grid> gridList = gridMap.get(Difficulte.valueOf(diff));
        if(gridList!= null) {
            final ArrayList<GridDTO1> retour = gridList.stream().map(grille -> new GridDTO1(grille)).collect(toCollection(ArrayList::new));
            return retour;
        }
        return null;
    }


    public Stream<Grid> allGridsStream() {
        final Difficulte[] diff = new Difficulte[gridMap.keySet().size()];
        final ArrayList<Grid> allArray = new ArrayList<Grid>();
        System.arraycopy(gridMap.keySet().toArray(), 0, diff, 0, gridMap.keySet().size());
        final Stream<Difficulte> keys = Arrays.stream(diff);
        keys.forEach(difficult -> allArray.addAll(gridMap.get(difficult)));
        final Grid[] grids = new Grid[allArray.size()];

        System.arraycopy(allArray.toArray(), 0, grids, 0, allArray.size());
        final Stream<Grid> stream = Arrays.stream(grids);
        return stream;
    }

    public Grid getGrid(final int id) {
        final Stream<Grid> stream = allGridsStream();
        final List Result = stream.filter((grid -> (grid.getId() == id))).collect(Collectors.toList());

        if (Result.size() == 0) {
            System.out.println("\n\n SHITTIIIII HERE \n\n");
            return null;
        }

        return (Grid) Result.get(0);
    }

    public void addScore(final String id, final Player player) throws IOException {
        final Grid grid = getGrid(Integer.parseInt(id));
        grid.addScore(player);

        final ArrayList<Grid> a = gridMap.get(grid.getDifficulte());
        a.remove(grid);
        a.add(grid);
        this.gridMap.put(grid.getDifficulte(), a);
        saveData();

    }

    public int getCurrentIndex() {
        return this.index;
    }

    public GridDTO generateGrid(final String level) {


        final int index = this.getCurrentIndex();
        try {

            final var client = HttpClient.newHttpClient();
            final var request = HttpRequest.newBuilder(
                            URI.create("https://sudoku.diverse-team.fr/sudoku-provider/" + level))
                    .header("accept", "application/json")
                    .build();

            final HttpResponse<String> response = client.send(request,
                    HttpResponse.BodyHandlers.ofString());


            final String reponseBody = response.body();
            final String[] tab = reponseBody.split("");
            final List<Integer> tabInt = Arrays.stream(tab).map(ca -> Integer.parseInt(ca)).collect(Collectors.toList());
            final int[] tabRendu = tabInt.stream().mapToInt(i -> i).toArray();
            Arrays.stream(tabRendu).forEach(fa -> System.out.println(fa));
            final String lvl = this.difficultMap.get(level);
            final Difficulte diff = Difficulte.valueOf(lvl.toUpperCase());

            final Grid retour = new Grid(index, new Classement(), diff, tabRendu);
            addGrid(retour);
            System.out.println(retour.toString());
            return new GridDTO(retour);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

    }
}
