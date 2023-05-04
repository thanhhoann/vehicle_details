import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Highlight,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Footer from "./components/Footer";

const DB_URL =
  "https://console.firebase.google.com/u/0/project/pdm-vehicle-registration/database/pdm-vehicle-registration-default-rtdb/data/~2F";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isOpenModalGetDetails, setIsOpenModalGetDetails] = useState(false);
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);

  const [vehicleOwnerName, setVehicleOwnerName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");

  const [userInfo, setUserInfo] = useState({});
  const [userInfoAfterQuery, setUserInfoAfterQuery] = useState({});

  const [addValues, setAddValues] = useState({
    new_vehicle_class: "",
    new_owner_name: "",
    new_registration_num: "",
    new_rc_status: "",
    new_model: "",
    new_registration_date: "",
  });

  const handleOpenModalGetDetails = () => {
    setIsOpenModalGetDetails(true);
  };
  const handleCloseModalGetDetails = () => {
    setIsOpenModalGetDetails(false);
  };

  const handleOpenModalAdd = () => {
    setIsOpenModalAdd(true);
  };

  const handleCloseModalAdd = () => {
    setIsOpenModalAdd(false);
  };

  // fetch data from Firebase
  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    fetch(DB_URL).then((res) => res.json()).then((data) => setFetchData(data));
  }, []);

  const handleSubmit = () => {
    handleOpenModalGetDetails();

    setUserInfo({
      vehicleOwnerName: vehicleOwnerName,
      registrationNumber: registrationNumber,
    });

    // find item in array of data
    const searchObj = fetchData.find((item) =>
      item.owner_name == vehicleOwnerName
    );
    if (searchObj) {
      setUserInfoAfterQuery(searchObj);
    }

    // reset input fields
    setVehicleOwnerName("");
    setRegistrationNumber("");
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setAddValues({ ...addValues, [name]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    handleOpenModalAdd();

    console.log(addValues);

    try {
      const response = await fetch(
        DB_URL,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(addValues),
        },
      );
      const data = await response.json();
      console.log(data);
      setAddValues({
        new_owner_name: "",
        new_registration_num: "",
        new_registration_date: "",
        new_model: "",
        new_rc_status: "",
        new_vehicle_class: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Stack w={"100vw"} h={"100vh"}>
        <Center my={"3rem"}>
          <Heading color={"#22223b"}>
            <Highlight
              query={"Vehicle Registration Details"}
              styles={{ px: "2", py: "1", rounded: "full", bg: "orange.100" }}
            >
              Find Your Vehicle Registration Details Online
            </Highlight>
          </Heading>
        </Center>

        <Center>
          <Box
            w={300}
            p={"20px"}
            border={"1px solid black"}
            borderRadius={"10px"}
          >
            <FormControl isRequired>
              <Box mb={"10px"}>
                <FormLabel>Vehicle Owner Name</FormLabel>
                <Input
                  type="text"
                  value={vehicleOwnerName}
                  onChange={(e) => setVehicleOwnerName(e.target.value)}
                />
              </Box>

              <Box mb={"10px"}>
                <FormLabel>Registration Number</FormLabel>
                <Input
                  type="text"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                />
              </Box>

              <Button
                mt={"1.2rem"}
                w={"full"}
                variant="outline"
                onClick={handleSubmit}
              >
                Get Details
              </Button>

              <Divider my={"1rem"} />

              <Button
                mt={"1.2rem"}
                w={"full"}
                variant="outline"
                onClick={handleAdd}
              >
                Add
              </Button>
            </FormControl>
          </Box>
        </Center>

        <Center>
          <Box
            mt={"4rem"}
            w={"300px"}
            border={"1px solid black"}
            rounded={"1rem"}
            p={"1rem"}
          >
            <Heading fontSize={"1.2rem"} mb={"1rem"}>
              Try this dummy example 🥺
            </Heading>
            <Text>John Doe - KA01AB1234</Text>
          </Box>
        </Center>
      </Stack>

      <Footer />

      <Modal
        isOpen={isOpenModalGetDetails}
        onClose={handleCloseModalGetDetails}
        size={"full"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"3rem"}>Registration Details</ModalHeader>
          <ModalBody fontSize={"1.2rem"}>
            <Box>
              <Text color={"gray.400"}>Owner Name</Text>
              {userInfo.vehicleOwnerName}
              <Divider my={"0.5rem"} />
              <Text color={"gray.400"}>Registration Number</Text>
              {userInfoAfterQuery.registration_number}
              <Divider my={"0.5rem"} />
              <Text color={"gray.400"}>Vehicle Class</Text>
              {userInfoAfterQuery.vehicle_class}
              <Divider my={"0.5rem"} />
              <Text color={"gray.400"}>Model</Text>
              {userInfoAfterQuery.model}
              <Divider my={"0.5rem"} />
              <Text color={"gray.400"}>Registration Date</Text>
              {userInfoAfterQuery.registration_date}
              <Divider my={"0.5rem"} />
              <Text color={"gray.400"}>RC Status</Text>
              {userInfoAfterQuery.RC_status}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCloseModalGetDetails}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isOpenModalAdd}
        onClose={handleCloseModalAdd}
        size={"full"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"3rem"}>
            Add a vehicle registration
          </ModalHeader>
          <ModalBody fontSize={"1.2rem"}>
            <Box>
              <form onSubmit={handleAdd}>
                <FormControl id="new_owner_name">
                  <FormLabel>Vehicle Owner Name</FormLabel>
                  <Input
                    type="text"
                    name="new_owner_name"
                    value={addValues.new_owner_name}
                    onChange={handleAddInputChange}
                  />
                </FormControl>

                <FormControl id="new_registration_num">
                  <FormLabel>Registration Number</FormLabel>
                  <Input
                    type="text"
                    name="new_registration_num"
                    value={addValues.new_registration_num}
                    onChange={handleAddInputChange}
                  />
                </FormControl>

                <FormControl id="new_vehicle_class">
                  <FormLabel>Vehicle Class</FormLabel>
                  <Input
                    type="text"
                    name="new_vehicle_class"
                    value={addValues.new_vehicle_class}
                    onChange={handleAddInputChange}
                  />
                </FormControl>

                <FormControl id="new_rc_status">
                  <FormLabel>RC Status</FormLabel>
                  <Input
                    type="text"
                    name="new_rc_status"
                    value={addValues.new_rc_status}
                    onChange={handleAddInputChange}
                  />
                </FormControl>

                <FormControl id="new_model">
                  <FormLabel>Model</FormLabel>
                  <Input
                    type="text"
                    name="new_model"
                    value={addValues.new_model}
                    onChange={handleAddInputChange}
                  />
                </FormControl>

                <FormControl id="new_registration_date">
                  <FormLabel>Registration Date</FormLabel>
                  <Input
                    type="text"
                    name="new_registration_date"
                    value={addValues.new_registration_date}
                    onChange={handleAddInputChange}
                  />
                </FormControl>

                <Button mt="2rem" type="submit">Submit</Button>
              </form>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCloseModalAdd}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default App;
