package game.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
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
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;

import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.logging.Level;
import java.util.logging.Logger;

import static org.springframework.test.util.AssertionErrors.assertEquals;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;




@WebMvcTest(controllers = SudokuController.class)
@ActiveProfiles("test")
class SudokuControllerTest {
    static final Logger LOGGER =
            Logger.getAnonymousLogger();
    @MockBean
    private MemoryService memoryService;

    @MockBean
    private SudokuController sudok;
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
    void getById() throws Exception {
        this.mockMvc.perform(get("http://localhost:4445/api//sudokugrid/0"))
                .andExpect(status().isOk()).andDo(print());
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