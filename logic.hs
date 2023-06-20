module Scheduler where

import Data.List (sort)

-- Define the Shift data type
data Shift = Shift
  { startTime :: Int
  , endTime :: Int
  } deriving (Show)

-- Define the Employee data type
data Employee = Employee
  { employeeName :: String
  , employeeShifts :: [Shift]
  } deriving (Show)

-- Define the Schedule class
class Schedule a where
  -- Add a shift to the entity
  addShift :: Shift -> a -> a
  -- Calculate the total working hours
  totalWorkingHours :: a -> Int

-- Implement the Schedule instance for Employee
instance Schedule Employee where
  addShift shift employee = employee { employeeShifts = shift : employeeShifts employee }
  totalWorkingHours employee = sum $ map (\shift -> endTime shift - startTime shift) (employeeShifts employee)

-- Define the Roster data type
newtype Roster = Roster [Employee]

-- Implement the Schedule instance for Roster
instance Schedule Roster where
  addShift shift (Roster employees) = Roster $ map (\employee -> addShift shift employee) employees
  totalWorkingHours (Roster employees) = sum $ map totalWorkingHours employees

-- Create a shift with start and end times
createShift :: Int -> Int -> Shift
createShift start end = Shift { startTime = start, endTime = end }

-- Create an employee with a name and no shifts initially
createEmployee :: String -> Employee
createEmployee name = Employee { employeeName = name, employeeShifts = [] }

-- Create a roster with a list of employees
createRoster :: [Employee] -> Roster
createRoster employees = Roster employees

-- Sort employees by total working hours
sortEmployeesByWorkingHours :: Roster -> Roster
sortEmployeesByWorkingHours (Roster employees) = Roster $ sort employeesByHours
  where
    employeesByHours = sort employeesByTotalHours
    employeesByTotalHours = map fst sortedEmployeeHours
    sortedEmployeeHours = sort $ map (\employee -> (employee, totalWorkingHours employee)) employees

-- Example usage
main :: IO ()
main = do
  -- Create shifts
  let shift1 = createShift 9 17
      shift2 = createShift 10 18
  -- Create employees
  let employee1 = createEmployee "John Doe"
      employee2 = createEmployee "Jane Smith"
  -- Create a roster with the employees
  let roster = createRoster [employee1, employee2]
  -- Add shifts to the roster
  let rosterWithShifts = addShift shift1 (addShift shift2 roster)
  -- Sort employees by working hours
  let rosterSortedByHours = sortEmployeesByWorkingHours rosterWithShifts
  -- Print results
  putStrLn "Shift Scheduling Program"
  putStrLn "------------------------"
  putStrLn $ "Total working hours for employee 1: " ++ show (totalWorkingHours employee1)
  putStrLn $ "Total working hours for employee 2: " ++ show (totalWorkingHours employee2)
  putStrLn $ "Total working hours for the roster: " ++ show (totalWorkingHours roster)
  putStrLn "Roster before sorting:"
  print rosterWithShifts
  putStrLn "Roster after sorting:"
  print rosterSortedByHours
