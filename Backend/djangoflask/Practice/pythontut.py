import sys
import math
import random
import threading
import time
from functools import reduce
import re
import sqlite3
import csv


# print("hello")
# name=input("What is your name? ")
# print("Hi", name)

# v1 = (
#     1 + 2
#     + 3
# )

# print(type(v1))
# print(sys.maxsize)

# cn1 = 5 + 6j
# cn2 = 6+ 3j

# print(cn1 + cn2)

# str1 = "Escape sequences \' \" \\ \n"
# str2 = ''' Triple quoted strings ' " '''

# print("Cast", type(int(5.4)), int(5.6))
# print("Cast", type(str(5.4)), str(5.4))
# print("Cast", type(chr(97)), chr(97))
# print("Cast", type(ord('a')), ord('a'))


# print(18,10,1999,sep='/')
# print("No newline", end='')
# print("\n %04d %s %.2f %c" % (1,"Derek", 1.234, 'A'))

# #decimal with 4 leading zeroes, converted into string, float with 2 decimal places of precision, character


# print("Random", random.randint(1,101))
# print(math.inf)

# print(math.inf - math.inf)
# age = 15
# canVote = True if age >=18 else False
# print(canVote)

# str3 = "Hello you"
# # print("Every other", str3[0:len(str3):2])
# print("You index", str3.find("You"))
# print("   Hello   ".strip())
# print("   Hello   ".lstrip())
# print("   Hello   ".rstrip())


# int1 = int2 = 5
# print(f'{int1}+ {int2} = {int1+int2}' )

# l1 = [1,3,14,"Derek",True]
# print("Length", len(l1))
# # print("1st", l1[0], "Last", l1[-1])

# l1[2:4] = ["bob", False]
# l1[2:2] = ["Paul",9]
# # print(l1)
# l2 = l1 + ['Egg', 4]
# l2.remove("Paul")
# l2.append("Arindam")
# print(l2)
# l2.pop(0)
# print(l2)

# print("Max", min([1,2,3,4]))
# print("Max", max([1,5,3,4]))

# l1 = [1,5,3,4]
# print("Reverse", l1[::-1])


# idx =1
# while idx<20:
#     if(idx %2 ==0):
#         print(idx)
#     idx+=1

# for i in range(0,10):
#     print(i)

# l5 = [6,9,12]
# itr = iter(l5)
# print(next(itr))

# print(next(itr))
# print(next(itr))
# print(next(itr))

# print(list(range(0,10)))
# print(list(range(0,10,2)))

# t1 = [1,3.14,"derek"]
# t1[0] = 9
# print(t1)

# heroes = {
#     "Superman":"Clark Kent",
#     "Batman":"Bruce Waynw"
# }

# print("Length", len(heroes))
# print(heroes["Superman"])
# heroes["Flash"] = "Barry A;llne"
# heroes["Flash"] = "Barry Allen"
# print(list(heroes["Superman"]))
# print(list(heroes.items()))
# print(list(heroes.keys()))
# print(list(heroes.values()))

# del heroes["Flash"]
# # print(heroes.pop("Batman"))
# # print(heroes[1])

# for k in heroes:
#     print(k)
# for v in heroes.values():
#     print(v)

# d1 = {"name":"bread", "price":.88}
# print("%(name)s costs $%(price).2f" % d1)

# s1 = set(["Derek", 1])
# s2 = {"Paul", 1}

# print("Length", len(s2))

# s3 = s1 | s2 #This will join the two sets
# # print(s3)

# s3.add("Doug")
# # print(s3)
# s3.discard("Derek")
# # print(s3)
# # print("Random deletion", s3.pop())
# # print(s3)
# s3 |= s2
# # print("Lengrh", len(s2))
# # print(s1.intersection(s2))
# # print(s1.symmetric_difference(s2))
# # print(s1-s2)
# # print("Length",len(s2))
# s3.clear()
# s4 = frozenset(["Paul", 7]) #Cannot change its details at all

# def get_sum(num1: int = 1, num2: int = 2):
#     print(num1, num2)

# get_sum()

# def get_sum2(*args):
#     sum=0
#     for arg in args:
#         sum+=arg

#     return sum


# print(get_sum2(1,2,3,4))

# def next_2(num):
#     return num + 1, num + 2

# i1, i2 = next_2(5) #Destructuring
# print(i1, i2)

# def mult_by(num):
#     return lambda x: x*num
# # print("3 * 5=", (mult_by(3)(5)))


# def mult_list(list, func):
#     for x in list:
#         print(func(x))


# mult_by_4 = mult_by(4)
# mult_list(list(range(0, 4)), mult_by_4)

# power_list = [lambda x: x**2,
#  lambda x: x**3]


# one_to_4 = range(1,5)
# times2=lambda x: x*2

# print(list(map(times2, one_to_4)))

# print(list(filter((lambda x: x%2 == 0), range(1,50))))

# print(reduce((lambda x, y: x+y), range(1,6)))

# while True:
#     try: 
#         number =int(input("Please enter a number:"))
#         break
#     except ValueError:
#         print("You did not enter a number")
#     except:
#         print("An unknown error occured")

# print("EoProcess")

# with open("mydata.txt", mode="w", encoding="utf-8") \
#     as my_file:
#     my_file.write("Some randomtext\nMore random text\nand more.")


# with open("mydata.txt", encoding="utf-8") as my_file:
#     print(my_file.read())

# print(my_file.closed)

# class Square:
#     def __init__(self, height="0", width="0"):
#         self.height = height
#         self.width = width
    
#     @property
#     def height(self): #getter
#         print("Retrieving the height")
#         return self.__height
    
#     @height.setter
#     def height(self, value):
#         if value.isdigit():
#             self.__height = value
#         else:
#             print("Please enter a valid number for height")

#     @property
#     def width(self): #getter
#         print("Retrieving the height")
#         return self.__width
    
#     @width.setter
#     def width(self, value):
#         if value.isdigit():
#             self.__width = value
#         else:
#             print("Please enter a valid number for width")

#     def get_area(self):
#         return int(self.__width) * int(self.__height)

# square = Square()
# square.height = "10"
# square.width = "5"
# print(square.get_area())

# class Animal:
#     def __init__(self, name="unknown", weight=0):
#         self.__name = name
#         self.__weight = weight
    
#     @property
#     def name(self, name):
#         self.__name = name

#     def make_noise(self):
#         return "Roar"

#     def __str__(self):
#         return "{} is a {} and says {}".format(self.__name, type(self.__name), self.make_noise())

#     def __gt__(self, animal2):
#         if self.__weight > animal2.__weight:
#             return True
#         else:
#             return False

# class Dog(Animal):
#     def __init__(self, name="unknown", owner = "unknown", weight=0):
#         Animal.__init__(self, name, weight)
#         self.__owner = owner
    
#     def __str__(self):
#         return super().__str__() + " and is owned by " + \
#             self.__owner

# animal = Animal("Spot", 100)
# print(animal)
# dog = Dog("Bowser", "Bob", 150)
# print(dog)
# print(animal >dog)


########## threading

# def execute_thread(i):
#     print("Thread {} sleeps at {}".format(i, time.strftime("%H:%M:%S", time.gmtime())))
#     rand_sleep_time = random.randint(1,5)
#     time.sleep(rand_sleep_time)
#     print("Thread {} stops sleeping at at {}".format(i, time.strftime("%H:%M:%S", time.gmtime())))

# for i in range(10):
#     thread = threading.Thread(target = execute_thread, args=(i,))
#     thread.start()
#     print("Active Thread:", threading.activeCount())
#     print("Thread objects: ", threading.enumerate())

########## REGEX ############
# if re.search("ape", "The ape at the apex"):
#     print("There is an ape")

# allApes = re.findall("ape", "The ape at the apex")
# for i in allApes:
#     print(i)

# the_str = "The ape at the apex"
# for i in re.finditer("ape.", the_str):
#     loc_tuple = i.span()
#     # print(loc_tuple)
#     print(the_str[loc_tuple[0]:loc_tuple[1]])

############ DATABASES

# def printDB():
#     try:
#         result = theCursor.execute("select * from Employees")
#         for row in result:
#             print("ID: ", row[0])
#             print("FName: ", row[1])
#             print("LName: ", row[2])
#             print("Age: ", row[3])
#             print("Salary: ", row[4])
#             print("Hire date: ", row[5])
#     except sqlite3.OperationalError:
#         print("The table doesn't exist")
#     except:
#         print("Coudlnt get data")

# db_conn = sqlite3.connect('test.db')
# print("DB Created")
# theCursor = db_conn.cursor()
# try:
#     db_conn.execute("CREATE TABLE Employees(ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, FName TEXT NOT NULL, LName NOT NULL, Age INT NOT NULL, SALARY REAL, HireDate TEXT);")
#     db_conn.commit()
#     print("Table created.")
# except sqlite3.OperationalError:
#     print("Table not created")
# except:
#     print("Some other error")

# db_conn.execute("INSERT INTO Employees (FName, LName, Age, SALARY, HireDate) VALUES ('Arindam', 'Keswani', 41, 22000, date('now'))" )
# db_conn.commit()
# printDB()
# db_conn.close()

########### import functions

# import myfunc
# print(myfunc.factorial(5))

from myfunc import factorial
print(factorial(4))