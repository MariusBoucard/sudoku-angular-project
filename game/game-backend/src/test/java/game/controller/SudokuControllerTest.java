package game.controller;

import game.controller.SudokuController;
import game.service.MemoryService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = SudokuController.class)
@ActiveProfiles("test")
class SudokuControllerTest {
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

       this.mockMvc.perform(get("http://localhost:4445/api/generategrid/easy"))
               .andExpect(status().isOk());
    }

    @Test
    void sudokuList() throws Exception {
        this.mockMvc.perform(get("http://localhost:4445/api/generategrid/easy"))
                .andExpect(status().isOk());
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