package game.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import game.model.Classement;
import game.model.Difficulte;
import game.model.Grid;
import game.model.Player;
import game.service.MemoryService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;

import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.logging.Level;
import java.util.logging.Logger;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.Mockito.when;
import static org.springframework.test.util.AssertionErrors.assertEquals;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;




@WebMvcTest(controllers = SudokuController.class)
class SudokuControllerTest {
    static final Logger LOGGER =
            Logger.getAnonymousLogger();
    @MockBean
    private MemoryService memoryService;


    @Autowired
    private MockMvc mockMvc;
    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void generate() throws Exception {
        try {


            this.mockMvc.perform(get("http://localhost:4445/api/generategrid/easy")
                            .accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                   ;

        }catch(Exception ex) {
            LOGGER.log(Level.SEVERE , "CRASH : we just tried to generate a new grid, and this shitted in the " +
                    "glue : ", ex);
        }

    }


    @Test
    public void hello() throws Exception {
        String hello = "hello";

        mockMvc.perform(get("/api/"))
                .andExpect(status().isOk())
                .andExpect(content().string(hello));
    }

      @Test
        void testgetGrid() throws Exception {
                int tabf[] = {8,1,2,3,9,7,6,5,4,9,0,0,0,2,0,7,1,8,7,6,4,8,1,5,3,9,0,5,0,7,9,0,1,8,0,0,0,8,9,0,3,0,5,7,1,1,2,6,7,5,8,9,4,3,6,9,1,0,7,3,0,0,5,0,4,
                  8,5,6,9,1,3,7,3,0,5,1,8,0,0,6,9};
                Grid grille = new Grid(1,new Classement(), Difficulte.EASY,tabf);

                when(memoryService.getGrid(1)).thenReturn((grille));
                this.mockMvc.perform(get("/api/sudokugrid/1"))
                        .andExpect(status().isOk())
                        .andExpect(content().string(containsString(
                                            "difficulte")))
                        .andDo(print());
        }
    @Test
    void testgetGridwrong() throws Exception {
        int tabf[] = {8,1,2,3,9,7,6,5,4,9,0,0,0,2,0,7,1,8,7,6,4,8,1,5,3,9,0,5,0,7,9,0,1,8,0,0,0,8,9,0,3,0,5,7,1,1,2,6,7,5,8,9,4,3,6,9,1,0,7,3,0,0,5,0,4,
                8,5,6,9,1,3,7,3,0,5,1,8,0,0,6,9};

        when(memoryService.getGrid(-1)).thenReturn(null);
        this.mockMvc.perform(get("/api/sudokugrid/-1"))
                .andExpect(status().isNotFound())

                .andDo(print());
    }
    @Test
    void generatenotOk() throws Exception {
        try {


            RequestBuilder requestBuilder = MockMvcRequestBuilders.get("http://localhost:4445/api/generategrid/clodo")
                    .accept(MediaType.APPLICATION_JSON);



            MvcResult mvcResult = mockMvc.perform(requestBuilder).andReturn();

            int actualResult = mvcResult.getResponse().getStatus();
            int expectedResult = HttpStatus.OK.value();

            assertEquals("Result as expected!",expectedResult,actualResult);



        }catch(Exception ex) {
            LOGGER.log(Level.SEVERE , "CRASH : we just tried to generate a new grid, and this shitted in the " +
                    "glue : ", ex);
        }

    }

    @Test
    void sudokuList() throws Exception {
        try{
            this.mockMvc.perform(get("http://localhost:4445/api/sudokulist/easy")
                            .accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());

    }catch(Exception ex) {
        LOGGER.log(Level.SEVERE , "CRASH : we just tried to generate a new grid, and this shitted in the " +
                "glue : ", ex);
    }
    }

    @Test
    void load() throws Exception {
        this.mockMvc.perform(get("http://localhost:4445/api/load"))
                .andExpect(status().isOk());
    }

    @Test
    void helloworld() throws Exception {
        this.mockMvc.perform(get("http://localhost:4445/api/"))
                .andExpect(status().isOk());
    }

    @Test
    void getallgrids() throws Exception {
        this.mockMvc.perform(get("http://localhost:4445/api/getallgrids"))
                .andExpect(status().isOk());
    }

    @Test
    void addScore() throws Exception {
        Player dartypapa = new Player("Topin",42);
        RequestBuilder requestBuilder = MockMvcRequestBuilders.post("http://localhost:4445/api/addscore/0")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(dartypapa));
        this.mockMvc.perform(requestBuilder)
                .andExpect(status().isOk());
    }
}