Feature: Unpark a vehicle

    In order to unpark a parked my vehicle
    As an application user
    I should be able to unpark my vehicle

    Background:
        Given my fleet
        And a vehicle
        And I have registered this vehicle into my fleet
        And a location
        And my vehicle has been parked into this location
    
    @real-infrastructure
    Scenario: Successfully unpark a vehicle
        When I unpark my vehicle
        Then my vehicle should be attached to no location

    Scenario: Can't unpark a vehicle that is not parked
        When I unpark my vehicle
        When I try to unpark my vehicle
        Then I should be informed that my vehicle is not parked

    Scenario: Can't unpark a vehicle that is not registered
        When I unregister this vehicle from my fleet 
        When I try to unpark my vehicle
        Then I should be informed this vehicle is not registered into my fleet

    Scenario: Can't unpark unexisting vehicle
        When I try to unpark an unexisting vehicle
        Then I should be informed this vehicle is not found

    Scenario: Can't unpark a vehicle with unexisting fleet
        When I try to unpark a vehicle with unexisting fleet
        Then I should be informed this fleet is not found
        