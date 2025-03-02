Feature: Park a vehicle

    In order to not forget where I've parked my vehicle
    As an application user
    I should be able to indicate my vehicle location

    Background:
        Given my fleet
        And a vehicle
        And I have registered this vehicle into my fleet

    @critical @real-infrastructure
    Scenario: Successfully park a vehicle
        And a location
        When I park my vehicle at this location
        Then the known location of my vehicle should verify this location

    Scenario: Can't localize my vehicle to the same location two times in a row
        And a location
        And my vehicle has been parked into this location
        When I try to park my vehicle at this location
        Then I should be informed that my vehicle is already parked at this location
    
    Scenario: Can't park a vehicle that is not registered
        And a location
        When I unregister this vehicle from my fleet
        When I try to park my vehicle at this location
        Then I should be informed this vehicle is not registered into my fleet

    Scenario: Can't park a vehicle on unappropriate location
        And a airport location
        When my vehicle is a car
        When I try to park my vehicle at this location
        Then I should be informed that my vehicle is not allowed to park here

    Scenario: Can't park a vehicle with unexisting location
        When I try to park my vehicle at this location
        Then I should be informed this location is not found

    Scenario: Can't park unexisting vehicle
        And a location
        When I try to park an unexisting vehicle at this location
        Then I should be informed this vehicle is not found

    Scenario: Can't park a vehicle with unexisting fleet
        And a location
        When I try to park a vehicle with unexisting fleet at this location
        Then I should be informed this fleet is not found