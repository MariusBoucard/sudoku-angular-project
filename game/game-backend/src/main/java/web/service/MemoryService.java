package web.service;

import org.springframework.stereotype.Service;
import web.model.Difficulte;
import web.model.Grid;
import web.model.Player;

import java.io.IOException;
import java.lang.reflect.Array;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;
@Service
public class MemoryService {
    HashMap<Difficulte, ArrayList<Grid>> GridMap = new HashMap<>();
    final static SavingService savingService = new SavingService();

    int index = 0;
    MemoryService(){
          loadData();
    }
    public void loadData(){
        this.GridMap =savingService.loadFromFile();
        //GridMap  =
        Stream<Grid> stream = allGridsStream();
        index = (int) stream.count();

        System.out.println("Gridmaaappp :"+this.GridMap);

    }

    private void saveData() throws IOException {
        savingService.saveOnFile(GridMap);
        Stream<Grid> stream = allGridsStream();
        index = (int) stream.count();
    }

    public void addGrid(Grid grid) throws IOException {
        ArrayList<Grid> a = GridMap.get(grid.getDifficulte());
        if(a == null){
            a = new ArrayList<Grid>();
        }
        a.add(grid);
        this.GridMap.put(grid.getDifficulte(),a);
        saveData();
    }

    public ArrayList<Grid> getList(String diff){
        return GridMap.get(Difficulte.valueOf(diff));
    }


    public Stream<Grid> allGridsStream(){
        Difficulte diff[] = new Difficulte[GridMap.keySet().size()];
        ArrayList<Grid> allArray = new ArrayList<Grid>();
        System.arraycopy(GridMap.keySet().toArray(), 0, diff, 0, GridMap.keySet().size());
        Stream<Difficulte> keys = Arrays.stream(diff);
        keys.forEach(difficult -> allArray.addAll(GridMap.get(difficult)));
        Grid grids[] = new Grid[allArray.size()];

        System.arraycopy(allArray.toArray(), 0, grids, 0, allArray.size());
        Stream<Grid> stream = Arrays.stream(grids);
        return stream;
    }
    public Grid getGrid(int id){
        Stream<Grid> stream = allGridsStream();
        List Result =  stream.filter((grid -> (grid.getID() == id))).collect(Collectors.toList());

        if(Result.size()==0){
            System.out.println("\n\n SHITTIIIII HERE \n\n");
            return null;
        }

        return (Grid) Result.get(0);
    }
    public void addScore(String id, Player player) throws IOException {
        Grid grid = getGrid(Integer.parseInt(id));
        grid.addScore(player);

        ArrayList<Grid> a = GridMap.get(grid.getDifficulte());
        a.remove(grid);
        a.add(grid);
        this.GridMap.put(grid.getDifficulte(),a);
        saveData();

    }

    public int getCurrentIndex(){
        return this.index;
    }

}
