#include <iostream>
#include <vector>

using namespace std;

void fibonacci(int n)
{
    int a1 = 0;
    int a2 = 1;
    int sum = 0;

    while (a1 <= n)
    {
        cout << a1 << " ";
        sum = a1 + a2;
        a1 = a2;
        a2 = sum;
    }
    cout << endl;
}

void daimondPattern(int n)
{

    for (int i = 0; i < n; i++)
    {

        int a = 1;
        for (int j = 0; j < n - i; j++)
        {
            cout << "  ";
        }
        for (int k = 0; k < i + 1; k++)
        {

            cout << a << " ";
            a += 2;
        }
        if (i != 0)
        {
            for (int j = 0; j < i; j++)
            {
                char c = 65 + j;
                cout << c << " ";
            }
        }
        cout << endl;
    }

    for (int i = 0; i < n - 1; i++)
    {
        cout << "    ";
        int a = 1;
        for (int j = 0; j < i; j++)
        {
            cout << "  ";
        }
        for (int j = 0; j < n - i - 1; j++)
        {
            cout << a << " ";
            a += 2;
        }
        for (int k = 0; k < n - i - 2; k++)
        {
            char c = 65 + k;
            cout << c << " ";
        }
        cout << endl;
    }
}

int main()
{

    int userInput;

    cout << "User input: ";
    cin >> userInput;

    cout << "Program output:" << endl;
    fibonacci(userInput);

    int userNumber;

    cout << "Please enter your lucky number: ";
    cin >> userNumber;

    cout << "Program output:" << endl;

    cout << endl;

    daimondPattern(userNumber);
    return 0;
}