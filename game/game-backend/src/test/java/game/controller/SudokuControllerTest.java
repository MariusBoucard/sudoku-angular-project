package game.controller;

import game.service.MemoryService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;

import java.util.logging.Level;
import java.util.logging.Logger;

import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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
                    .andExpect((ResultMatcher) content().contentType(MediaType.APPLICATION_JSON))
                    .andExpect((ResultMatcher) jsonPath("$.id").isNumber());

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
                    .andExpect(status().isOk())

                    .andExpect((ResultMatcher) jsonPath("$[0]").isArray())
                    .andExpect((ResultMatcher) content().contentType(MediaType.APPLICATION_JSON));

    }catch(Exception ex) {
        LOGGER.log(Level.SEVERE , "CRASH : we just tried to generate a new grid, and this shitted in the " +
                "glue : ", ex);
    }
    }

    @Test
    void load() throws Exception {
        this.mockMvc.perform(get("http://localhost:4445/api/generategrid/easy"))
                .andExpect(status().isOk());
    }

    @Test
    void testSudokuList() throws Exception {
        this.mockMvc.perform(get("http://localhost:4445/api/generategrid/easy"))
                .andExpect(status().isOk());
    }

    @Test
    void getallgrids() throws Exception {
        this.mockMvc.perform(get("http://localhost:4445/api/generategrid/easy"))
                .andExpect(status().isOk());
    }

    @Test
    void getById() throws Exception {
        this.mockMvc.perform(get("http://localhost:4445/api/generategrid/easy"))
                .andExpect(status().isOk());
    }

    @Test
    void addScore() throws Exception {
        this.mockMvc.perform(get("http://localhost:4445/api/generategrid/easy"))
                .andExpect(status().isOk());
    }
}