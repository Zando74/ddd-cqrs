Feature: CLI Operations for Fleet Management

    In order to manage my fleet via command line interface
    As a system user
    I can use CLI commands to create a fleet, register a vehicle, and localize a vehicle

    @cli
    Scenario: Successfully create a fleet via CLI
        When I execute create command
        Then I should see the fleetId on the standard output

    @cli
    Scenario: Successfully be informed of error via CLI
        Given my fleet
        When I execute create command
        Then I should see the error message on the standard output

    @cli
    Scenario: Successfully create and register a vehicle via CLI
        Given my fleet
        When I execute register-vehicle command
        Then this vehicle should be part of my vehicle fleet

    @cli
    Scenario: Successfully create a location and localize a vehicle via CLI
        Given my fleet
        And a vehicle
        And I have registered this vehicle into my fleet
        When I execute localize-vehicle command
        Then the known location of my vehicle should verify this location

    @cli
    Scenario: Successfully register an existing vehicle via CLI
        Given my fleet
        And a vehicle
        When I execute register-vehicle command
        Then this vehicle should be part of my vehicle fleet

    @cli
    Scenario: Successfully localize vehicle to an existing location via CLI
        Given my fleet
        And a vehicle
        And I have registered this vehicle into my fleet
        And a location
        When I execute localize-vehicle command
        Then the known location of my vehicle should verify this location