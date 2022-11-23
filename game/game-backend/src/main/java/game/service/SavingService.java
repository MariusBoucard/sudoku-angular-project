package game.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import game.model.Difficulte;
import game.model.Grid;


import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.ObjectOutputStream;
import java.io.File;
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


        System.out.println(file + "\n\n\n\n\n caca " + System.getProperty("user.dir") + " \n\n\n\n\n");


    }


    void saveOnFile(final Map<Difficulte, ArrayList<Grid>> gridMap) throws IOException {
        final ObjectOutputStream s;
        try {
            //    FileOutputStream f = new FileOutputStream(outputfile);
            //   s = new ObjectOutputStream(f);
            System.out.println("obj" + gridMap);

            final FileWriter file = new FileWriter(outputfile);
            final String a = new ObjectMapper().writeValueAsString(gridMap);
            System.out.println(a);
            file.write(a);
            file.close();

        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            e.printStackTrace();
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
//            JSONObject json = new JSONObject(myReader.nextLine());
//            System.out.println(json);
            try {

                Map = mapperObj.readValue(myReader.nextLine(), new TypeReference<HashMap<Difficulte, ArrayList<Grid>>>() {
                });
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            } catch (NoSuchElementException e) {
                e.printStackTrace();
            }

        }


/*


        JSONParser parser = new JSONParser(outputfile);

        try {
            Object obj = parser.parse();
            // A JSON object. Key value pairs are unordered. JSONObject supports java.util.Map interface.
            JSONObject jsonObject = (JSONObject) obj;
            // A JSON array. JSONObject supports java.util.List interface.
            JSONArray companyList = (JSONArray) jsonObject.get("Company List");
            // An iterator over a collection. Iterator takes the place of Enumeration in the Java Collections Framework.
            // Iterators differ from enumerations in two ways:
            // 1. Iterators allow the caller to remove elements from the underlying collection during the iteration with well-defined semantics.
            // 2. Method names have been improved.

        } catch (Exception e) {
            e.printStackTrace();
        }
*/

//        JSONObject json  = new JSONObject(outputfile);

//        JSONParser jsonP = new JSONParser(outputfile);
//        try {
//            JSONObject jsonO = (JSONObject) jsonP.parse();
//        }catch(Exception e){
//            e.printStackTrace();
//        }
//        Object obj = null;
//        if(json != JSONObject.NULL) {
//            Map = toMap(json);
//        }
        return Map;

        //JSONObject jsonObject = (JSONObject)obj;
        //Set<String> difficultes = jsonObject.keySet();
        //System.out.println(difficultes);
        //  for (String a : difficultes ) {
        //JSONArray subjects = (JSONArray)jsonObject.get(Difficulte);
        //Map.put(Difficulte.valueOf(a),   )

        //   }



            /*try{FileInputStream entree = new FileInputStream(outputfile);
                ObjectInputStream stream = new ObjectInputStream(entree);

                Map= (Object) stream.readObject();
                System.out.println(Map.toString());
                //Map = (HashMap<Difficulte, ArrayList<Grid>>) stream.readObject();
            }catch (EOFException e){
                Map = new HashMap<Difficulte, ArrayList<Grid>>();
            }
            catch (ClassNotFoundException e) {
                e.printStackTrace();
            } catch (FileNotFoundException e) {
                throw new RuntimeException(e);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        System.out.println("Loaded previous game!");*/
        // return Map;
    }


//     /**
//      * @param object
//      * @return
//      * @throws JSONException
//      */
//     public static Map<Difficulte, ArrayList<Grid>> toMap(final JSONObject object) throws JSONException {
// //        final Map<Difficulte, ArrayList<Grid>> map = new HashMap<Difficulte, ArrayList<Grid>>();
// //
// //        final Iterator<String> keysItr = object.keys();
// //        while (keysItr.hasNext()) {
// //            final String key = keysItr.next();
// //            final JSONArray value = object.getJSONArray(key);
// //            final ArrayList<Grid> gridsList = new ArrayList<>();
// //            for (int i = 0; i < value.length(); i++) {
// //                final JSONArray classm = (JSONArray) value.getJSONArray(i).get(3);
// //                final ArrayList<Player> classment = new ArrayList<>();
// //
// //                for (int j = 0; j < classm.length(); j++) {
// //                    classment.add(new Player((String) classm.getJSONObject(j).get("name"), (Integer) classm.getJSONObject(j).get("score")));
// //                }
// //                final Grid grid = new Grid((Integer) value.getJSONObject(i).get("id"), new Classement(classment), (Difficulte) value.getJSONObject(i).get("difficulte"), (int[]) value.getJSONObject(i).get("values"));
// //                gridsList.add(grid);
// //            }
// //
// //            map.put(Difficulte.valueOf(key), gridsList);
// //        }
// //        return map;
// //

//         try {
//             final Map<Difficulte, ArrayList<Grid>> map = new ObjectMapper().readValue( object, Map.class);
//             return map;

//         } catch (IOException e) {
//             throw new RuntimeException(e);
//         }

//     }

}
