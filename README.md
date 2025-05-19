Memory Allocation Simulator - MemOpt
Overview
MemOpt is an interactive memory allocation simulator that demonstrates how different allocation techniques work in modern operating systems. The tool simulates memory allocation strategies such as First Fit, Best Fit, and Worst Fit, allowing users to visualize how memory blocks are allocated, track fragmentation, and suggest the most efficient memory allocation technique based on the input.

Features
Simulates three memory allocation strategies:

First Fit

Best Fit

Worst Fit

Interactive user interface to add jobs (processes) with memory requests.

Memory block allocation with detailed metrics including:

Memory Block Size

Job Size

Allocation Status

Internal Fragmentation

Graphical representation of memory usage and fragmentation using Recharts (Bar and Pie Charts).

Comparison tool that suggests the best allocation strategy based on current memory status and fragmentation.

Tech Stack
Frontend:

React.js

Bootstrap (for styling)

Recharts (for graphical representation of memory usage)

Backend:

Node.js (if needed for real-time memory data, logging, etc. — can be expanded based on future needs)

Other:

JavaScript (ES6)
## Installation

Prerequisites
Ensure that you have Node.js and npm installed. You can download them from Node.js official website.

#Steps to Run Locally

Clone the repository to your local machine:
```bash
  git clone https://github.com/parthik10/memopt.git
```
Navigate to the project directory:
```bash
cd memopt
```

Install dependencies:
```bash
npm install
```

Start the React development server:
```bash
npm run dev
```
Open your browser and go to http://localhost:5000/ to view the application.
## Usage

Usage
Step 1: Select Allocation Strategy
Choose an allocation strategy from the dropdown:

First Fit

Best Fit

Worst Fit

Step 2: Add Jobs
You can add jobs with the job number and memory size for each process. Click "Add Job" to add the job to the list.

Step 3: Allocate Jobs
Once you've added jobs, click the "Allocate Jobs" button to allocate memory to each job based on the selected strategy.

Step 4: View Allocation Results
After the allocation is complete, the table will display:

Memory Block Size

Job Number

Job Size

Allocation Status (Allocated or Not Allocated)

Internal Fragmentation

Step 5: View Graphs
Graphs will show the Memory Utilization and Fragmentation (Pie Chart and Bar Chart) to visually represent how well the memory is allocated.

Step 6: Suggest the Best Technique
Click the "Suggest Best Technique" button to get the best memory allocation strategy based on internal fragmentation, external fragmentation, and wastage.

Components
SimulatorPage.js: Main page that combines all components and handles user interaction.

StrategySelector.js: Dropdown for selecting the allocation strategy.

AllocationForm.js: Form to input job numbers and memory sizes.

AllocationTable.js: Table to display allocation results with fragmentation and status.

BestTechniqueButton.js: Button to suggest the best allocation technique.

Graphs.js: Displays graphical representations of memory utilization and fragmentation.

memoryService.js: Logic for allocating memory using First Fit, Best Fit, and Worst Fit techniques.

helperFunctions.js: Utility functions for calculating fragmentation and wastage.




## how it works

Job Allocation:

Users input the job number and job size.

The program attempts to allocate memory to each job based on the selected allocation strategy.

If allocation is successful, the job is marked as "Allocated", otherwise, it is marked as "Not Allocated".

Memory Fragmentation:

Internal Fragmentation: The leftover space within an allocated memory block.

External Fragmentation: Free memory that is scattered across different blocks but cannot be used because no single block is large enough.

Best Technique Suggestion:

After allocation, the program compares different allocation strategies (First Fit, Best Fit, Worst Fit) based on internal and external fragmentation, suggesting the most efficient strategy.

## Contribution

Feel free to fork this repository, make changes, and submit pull requests. Contributions are welcome!

Steps for contributing:

Fork the repository.

Clone your forked repository:


```bash
git clone https://github.com/parthik10/memopt.git
```
Create a new branch:

```bash
git checkout -b feature-name
```
Commit your changes:

```bash
git commit -m "Your message describing the change"
```
Push your branch:

```bash
git push origin feature-name
```
Open a pull request.



