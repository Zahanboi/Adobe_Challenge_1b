# 🧠 Challenge 1B - Persona-based Document Relevance Extractor

This project extracts and ranks the most relevant sections from a set of PDFs based on a given **persona** and their **job-to-be-done**.

- **Runs in a CPU-only, Dockerized Node.js environment**
- **Works fully offline** (no internet access required)
- **Uses a <1GB offline embedding model** for document intelligence

---

## 📁 Directory Structure

```
.
├── data/
│   ├── input/
│   │   └── Collection-*/
│   │       ├── challenge1b_input.json
│   │       └── PDFs/
│   │           └── *.pdf
│   └── output/
│       └── Collection-*/
│           └── challenge1b_output.json
├── src/
│   ├── index.js
│   ├── parser.js
│   ├── embedder.js
│   ├── ranker.js
│   └── generateOutput.js
├── package.json
├── Dockerfile
└── README.md
```

---

## 📥 Input Format

Each collection folder inside `data/input/` must contain:

### `challenge1b_input.json`

```json
{
    "persona": {
        "role": "Travel Planner"
    },
    "job_to_be_done": "Plan a trip of 4 days for a group of 10 college friends.",
    "documents": [
        { "filename": "South of France - Cities.pdf" },
        { "filename": "South of France - Cuisine.pdf" }
    ]
}
```

All the files listed in `documents` must be present in the `PDFs/` folder under the respective collection.

---

## 📤 Output Format

Each processed collection generates a JSON output at:

```
data/output/Collection-*/challenge1b_output.json
```

---

## ⚙️ Processing Steps

- **Embedding:** Loads and uses a pre-downloaded offline embedding model via `@xenova/transformers` (`all-MiniLM-L6-v2`).
- **Similarity Calculation:** Computes cosine similarity between each page and the persona+job query.
- **Ranking:** Top 5 most relevant sections are ranked and extracted.
- **Output:** Final structured JSON is generated with metadata and findings.

---

## 🐳 Docker Usage

## 🐳 Docker Usage

### 1. **Build the image**

#### Linux / macOS / WSL
```bash
docker build -t challenge1b-runner .
```

#### Windows (CMD or PowerShell)
```cmd
docker build -t challenge1b-runner .
```

---

### 2. **Run the container**

#### Linux / macOS / WSL
```bash
docker run --rm -v "$(pwd)/data:/app/data" challenge1b-runner
```

#### Windows CMD
```cmd
docker run --rm -v "%cd%\data:/app/data" challenge1b-runner
```

#### Windows PowerShell
```powershell
docker run --rm -v "${PWD}\data:/app/data" challenge1b-runner
```

- Mounts `data/` directory for input and output processing.

---

## 🖥 Local Development

1. **Install dependencies**
        ```bash
        npm install
        ```
2. **Run the processor**
        ```bash
        npm run start
        ```

---

## 📌 Constraints Met

- ✅ No internet access required
- ✅ CPU-only execution
- ✅ Model size < 1GB
- ✅ Execution within 100 seconds per collection
- ✅ Node.js compatible environment
- ✅ Dockerized build & execution, works offline

