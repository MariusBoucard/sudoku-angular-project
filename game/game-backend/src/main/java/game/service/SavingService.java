package game.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import game.model.Difficulte;
import game.model.Grid;


import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.FileNotFoundException;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Scanner;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.NoSuchElementException;


@Service
public class SavingService {
    String outputfile = "save.txt";
//    FileOutputStream f;
//    ObjectOutputStream s;


    public SavingService() {
        final File file = new File(outputfile);
        try {
            if (file.createNewFile()) {
                System.out.println("File created: " + file.getName());
            } else {
                System.out.println("File already exists.");
            }
        } catch (Exception e) {
            e.printStackTrace();

        }


        System.out.println(file + "\n\n\n\n\n On est dans saving service " + System.getProperty("user.dir") + " \n\n\n\n\n");


    }


    void saveOnFile(final Map<Difficulte, ArrayList<Grid>> gridMap) throws IOException {
        try {
            final String a = new ObjectMapper().writeValueAsString(gridMap);
            System.out.println(a);
            final Path path = Path.of(outputfile);
            Files.writeString(path, a);


        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {

            throw new RuntimeException(e);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
        }
    }

    public Map<Difficulte, ArrayList<Grid>> loadFromFile() {
        Map<Difficulte, ArrayList<Grid>> Map = new HashMap<>();
        final File file = new File(outputfile);

        Scanner myReader = null;
        final ObjectMapper mapperObj = new ObjectMapper();
        try {
            myReader = new Scanner(file);
            //TODO un truc genre un forEach sur toutes les lignes ici, et mettre le contenu du while apres et c'est réglé (en théorie)
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
        if (myReader.hasNextLine()) {
            try {
                Map = mapperObj.readValue(myReader.nextLine(), new TypeReference<HashMap<Difficulte, ArrayList<Grid>>>() {
                });
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            } catch (NoSuchElementException e) {
                e.printStackTrace();
            }

        }


        return Map;

    }

}


