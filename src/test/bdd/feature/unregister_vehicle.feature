Feature: Unregister a vehicle

    In order to unregister a vehicle from my fleet
    As an application user
    I should be able to unregister my vehicle

    @real-infrastructure
    Scenario: I can unregister a vehicle
        Given my fleet
        And a vehicle
        And I have registered this vehicle into my fleet
        When I unregister this vehicle from my fleet
        Then this vehicle should not be part of my vehicle fleet

    Scenario: I can't unregister a vehicle that is not registered
        Given my fleet
        And a vehicle
        When I try to unregister this vehicle from my fleet
        Then I should be informed this vehicle is not registered into my fleet

    Scenario: I can't unregister unexisting vehicle
        Given my fleet
        When I try to unregister this vehicle from my fleet
        Then I should be informed this vehicle is not found

    Scenario: I can't unregister vehicle in unexisting fleet
        Given a vehicle
        When I try to unregister this vehicle from my fleet
        Then I should be informed this fleet is not found

    Scenario: I can't unregister a vehicle that is not part of my fleet
        Given my fleet
        And the fleet of another user
        And a vehicle
        And this vehicle has been registered into the other user's fleet
        When I try to unregister this vehicle from my fleet
        Then I should be informed this vehicle is not registered into my fleet