package game.service;

import game.model.Difficulte;
import game.model.Grid;
import game.model.Player;
import org.springframework.stereotype.Service;

import java.io.IOException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class MemoryService {
    Map<Difficulte, ArrayList<Grid>> gridMap = new HashMap<>();
    final  SavingService savingService = new SavingService();

    int index = 0;

    MemoryService() {
        loadData();
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

    public ArrayList<Grid> getList(final String diff) {
        return gridMap.get(Difficulte.valueOf(diff));
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
        final List Result = stream.filter((grid -> (grid.getID() == id))).collect(Collectors.toList());

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

}
