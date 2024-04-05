import { User } from '../../lib/User/User.store';

export interface MockUser {
    users: Array<User>;
    Contains: {
        (user: User): boolean;
        (email: string): boolean;
    };
    Add: (user: User) => boolean;
    Remove: (user: User) => boolean;
    Get: {
        (user: User): User | null;
        (email: string): User | null;
    };
    Clear: () => void
}

export const MockUsers: MockUser = {
    users: [],
    Contains: (arg: User | string) => {
        if (typeof arg === "string") {
            // Handle the case where arg is an email string
            return MockUsers.users.some((user) => user.email === arg);
        } else {
            // Handle the case where arg is a User object
            return MockUsers.users.some((user) => user.id === arg.id);
        }
    },
    Add: (userToAdd) => {
        if (!MockUsers.Contains(userToAdd)) {
            MockUsers.users.push(userToAdd);
            return true;
        }
        return false;
    },
    Remove: (userToRemove) => {
        const index = MockUsers.users.findIndex((user) => user.id === userToRemove.id);
        if (index !== -1) {
            MockUsers.users.splice(index, 1);
            return true;
        }
        return false;
    },
    Get: (arg: User | string) => {
        if (typeof arg === "string") {
            return MockUsers.users.find((user) => user.email === arg) || null;
        } else {
            return MockUsers.users.find((user) => user.id === arg.id) || null;
        }
    },
    Clear: () => {
        MockUsers.users = [];
    },
};
