package web.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import org.apache.tomcat.util.json.JSONParser;
import org.apache.tomcat.util.json.ParseException;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import web.model.Classement;
import web.model.Difficulte;
import web.model.Grid;
import web.model.Player;

import java.io.File;
import java.io.*;
import java.util.*;

import static java.util.stream.Collectors.toList;

@Service
public class SavingService {
    String outputfile = "save.txt";
//    FileOutputStream f;
//    ObjectOutputStream s;


    public SavingService()  {
        File file = new File(outputfile);
        try {
            if (file.createNewFile()) {
                System.out.println("File created: " + file.getName());
            } else {
                System.out.println("File already exists.");
            }
        }
        catch (Exception e){
            e.printStackTrace();

        }



        System.out.println(file+"\n\n\n\n\n caca "+System.getProperty("user.dir")+" \n\n\n\n\n");



    }


    void saveOnFile(HashMap<Difficulte,  ArrayList<Grid>> gridMap) throws IOException {
        ObjectOutputStream s;
        try {
        //    FileOutputStream f = new FileOutputStream(outputfile);
         //   s = new ObjectOutputStream(f);
            System.out.println("obj"+gridMap);

            FileWriter file = new FileWriter(outputfile);
            String a = new ObjectMapper().writeValueAsString(gridMap);
            System.out.println(a);
            file.write(a.toString());
            file.close();

        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public HashMap<Difficulte, ArrayList<Grid>> loadFromFile() {
        HashMap<Difficulte, ArrayList<Grid>> Map = new HashMap<>();
        File file = new File(outputfile);
        Scanner myReader = null;
        ObjectMapper mapperObj = new ObjectMapper();
        try {
            myReader = new Scanner(file);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
        while (myReader.hasNextLine()) {
//            JSONObject json = new JSONObject(myReader.nextLine());
//            System.out.println(json);
            try {

                Map = mapperObj.readValue(myReader.nextLine(), new TypeReference<HashMap<Difficulte,ArrayList<Grid>>>(){});
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
            catch (NoSuchElementException e) {
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


    public static HashMap<Difficulte, ArrayList<Grid>> toMap(JSONObject object) throws JSONException {
        HashMap<Difficulte, ArrayList<Grid>> map = new HashMap<Difficulte, ArrayList<Grid>>();

        Iterator<String> keysItr = object.keys();
        while(keysItr.hasNext()) {
            String key = keysItr.next();
            JSONArray value = object.getJSONArray(key);
            ArrayList<Grid> gridsList = new ArrayList<>();
            for (int i = 0; i < value.length(); i++) {
                JSONArray classm= (JSONArray) value.getJSONArray(i).get(3);
                ArrayList<Player> classment = new ArrayList<>();

                for(int j = 0;j<classm.length();j++){
                    classment.add(new Player((String) classm.getJSONObject(j).get("name"), (Integer) classm.getJSONObject(j).get("score")));
                }
                Grid grid = new Grid((Integer) value.getJSONObject(i).get("id"), new Classement(classment),(Difficulte) value.getJSONObject(i).get("difficulte"),(int[])value.getJSONObject(i).get("values"));
                gridsList.add(grid);
            }

            map.put(Difficulte.valueOf(key), gridsList);
        }
        return map;
    }

}
