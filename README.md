 ## Function Maintenance 2
> Function Maintenance is a javascript microservice design inspired solution to enable dhis to make analytics calculations above and beyond what is natively supported by DHIS2. 

> It supports non-standard and complex and even non standard calculations defined by a user-driven the data that is provided within dhis.

## Current features:
    * Ability to auto-generate default generic function capabilities supported on all dhis2 instances
    * Ability to create and edit new functions and related rules logics
    * Ability to edit code to make desired calculation for each function indicators
    * Ability to test the function indicators in real time that have been created.
    * Ability to compare the calculations with other data elements and/or indicators through data selections
    * Support for comprehensive, data, period and org unit selection filters. I.e. all dhis2 metadata and functions
    * Support for layout controls for chart, table and maps
    * Support for dynamic dimension selections into the the functions
    * Support for function visualizations for all charts, table and maps
    * Support for opening and modifying existing favorite visualizations
    * Support for preview of incoming parameters from selections into the functions for execution
    * Support for passing of layout and dynamic dimensions as part of selection parameters into the function
    * Support for search of functions and rules and pagination of existing functions and rules
    * Support for highlighting selected functions and rules under visualization
    * Support for all standard computation generic to all dhis2 instances (Predictors, Limit reporting rates to 100%, Limited Completeness exceeding 100%, Dataset completeness by input fields, or mandatory input fields, Orgunit analytics, i.e. Proportion of facilities meeting certain criteria, e.g. facility reporting ANC, reporting rates lead time i.e. measure of readiness/sharpness of reporting, i.e. facilities reporting sooner before deadline)



### Set up & Installation                                                                                                                                                                                                    
 > * Clone the repository from GitHub                                                                                                                                                                  
 ```                                                                                                                                                                            git clone https://github.com/hisptz/function-maintenance.git                                                                                                                                                      
```                                                                                                                                                                                                   
> * Enter to the directory and execute the following npm command to install the application to your computer.                                                                                         
```                                                                                                                                                                             npm install                                                                                                                                                                                           
```                                                                                                                                                                                                   
> * Once the application is installed and all its dependencies, execute the next command to run the application.                                                                                      
```                                                                                                                                                                                         
npm start                                                                                                                                                                                             
```                                    


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
