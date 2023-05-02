import logo from './logo.svg';
import {useState} from "react";
import './App.css';
import data from './mock_data.json'
import {
    Flex,
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Box,
    Divider,
    Button,
    Center,
    Heading,
    Stack,
    Highlight,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Text
} from "@chakra-ui/react";


function App() {
    const {isOpen, onOpen, onClose} = useDisclosure()

    const [vehicleOwnerName, setVehicleOwnerName] = useState('')
    const [registrationNumber, setRegistrationNumber] = useState('')

    const [userInfo, setUserInfo] = useState({})
    const [userInfoAfterQuery, setUserInfoAfterQuery] = useState({})

    const handleSubmit = () => {
        onOpen() // open modal

        setUserInfo({
            vehicleOwnerName: vehicleOwnerName, registrationNumber: registrationNumber
        })

        const searchObj = data.find((item) => item.owner_name == vehicleOwnerName)
        if (searchObj) {
            setUserInfoAfterQuery(searchObj)
        }

        // reset input fields
        setVehicleOwnerName('')
        setRegistrationNumber('')
    }

    return (<>
        <Stack w={'100vw'} h={'100vh'}>
            <Center w={'full'} p={'3rem'}>
                <Heading p={'0.5rem'} color={'#22223b'}>
                    <Highlight query={'Vehicle Registration Details'}
                               styles={{px: '2', py: '1', rounded: 'full', bg: 'orange.100'}}>
                        Find Your Vehicle Registration Details Online
                    </Highlight>
                </Heading>
            </Center>

            <Center>
                <Box w={300} p={'20px'} border={'1px solid black'} borderRadius={'10px'}>
                    <FormControl isRequired>
                        <Box mb={'10px'}>
                            <FormLabel>Vehicle Owner Name</FormLabel>
                            <Input type='text' value={vehicleOwnerName}
                                   onChange={e => setVehicleOwnerName(e.target.value)}/>
                        </Box>

                        <Box mb={'10px'}>
                            <FormLabel>Registration Number</FormLabel>
                            <Input type='text' value={registrationNumber}
                                   onChange={e => setRegistrationNumber(e.target.value)}/>
                        </Box>

                        <Button mt={'1.2rem'} w={'full'} variant='outline' onClick={handleSubmit}>
                            Get Details
                        </Button>
                    </FormControl>
                </Box>
            </Center>

            <Center>
                <Box mt={'4rem'} w={'300px'} border={'1px solid black'} rounded={'1rem'} p={'1rem'}>
                    <Heading fontSize={'1.2rem'} mb={'1rem'}>Try this dummy example 🥺</Heading>
                    <Text>John Doe - KA01AB1234</Text>
                </Box>
            </Center>
        </Stack>


        <Center mt={'-3rem'}><Text fontWeight={'700'}>Made by Thanh Hoàn</Text></Center>

        <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader fontSize={'3rem'}>Registration Details</ModalHeader>
                <ModalBody fontSize={'1.2rem'}>
                    <Box>
                        <Text color={'gray.400'}>Owner Name</Text>{userInfo.vehicleOwnerName}
                        <Divider my={'0.5rem'}/>
                        <Text color={'gray.400'}>Registration Number</Text>{userInfoAfterQuery.registration_number}
                        <Divider my={'0.5rem'}/>
                        <Text color={'gray.400'}>Vehicle Class</Text>{userInfoAfterQuery.vehicle_class}
                        <Divider my={'0.5rem'}/>
                        <Text color={'gray.400'}>Model</Text>{userInfoAfterQuery.model}
                        <Divider my={'0.5rem'}/>
                        <Text color={'gray.400'}>Registration Date</Text>{userInfoAfterQuery.registration_date}
                        <Divider my={'0.5rem'}/>
                        <Text color={'gray.400'}>RC Status</Text>{userInfoAfterQuery.RC_status}
                    </Box>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

    </>);
}

export default App;
