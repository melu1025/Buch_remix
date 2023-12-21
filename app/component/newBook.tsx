import { Box, Button, Checkbox, CheckboxGroup, Flex, Icon, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, Table, TableCaption, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import styles from "./NewBook.css";
import { useState } from "react";

const StarRating = ({ rating, setRating }) => {
    return (
      <Flex direction="column" align="center">
        <Box>
          {[1, 2, 3, 4, 5].map((star) => (
            <Icon
              key={star}
              as={StarIcon}
              boxSize={6}
              color={
                star <= rating
                ? "yellow.300"
                : "gray.300"  
            
              }
              onClick={() => setRating(star)}
              cursor="pointer"
            />
          ))}
        </Box>
      </Flex>
    );
  };

export default function NewBook () {

    const [rating, setRating] = useState(0);
    // const [isModalOpen, setIsModalOpen] = useState(false);

    // const handleAnlegenClick = () => {
    //   setIsModalOpen(true);
    // };
  
    // const handleCloseModal = () => {
    //   setIsModalOpen(false);
      
    //   return redirect('/search');
    // };

    return (
        <form method="post" id="note-form" className="body">
            <TableContainer>
                <Table >
                <TableCaption placement="top">Neues Buch anlegen</TableCaption>
                <Tbody>
                    <Tr>
                        <Td>
                            <label htmlFor="isbn">ISBN</label>
                        </Td>
                        <Td>
                            <input type="text" id="isbn" name="isbn" placeholder="ISBN" required/>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>
                            <label htmlFor="titel">Titel</label>
                        </Td>
                        <Td>
                            <input type="text" id="titel" name="titel" placeholder="Titel" required/>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>
                            <label htmlFor="untertitel">Untertitel</label>
                        </Td>
                        <Td>
                            <input type="text" id="untertitel" name="untertitel" placeholder="Untertitel" required />
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>
                            <label htmlFor="buchArt">Art des Buches</label>
                        </Td>
                        <Td>
                            <Select  id="buchArt" name="buchArt" placeholder="Art des Buches" required>
                                <option value="KINDLE">KINDLE</option>
                                <option value="DRUCKAUSGABE">DRUCKAUSGABE</option>
                                <option value="KeineAngabe">Keine Angabe</option>
                            </Select>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>
                            <label htmlFor="preis">Preis</label>
                        </Td>
                        <Td>
                            <input type="number" id="preis" name="preis" step="0.01" placeholder="Preis" required />
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>
                            <label htmlFor="rabatt">Rabatt</label>
                        </Td>
                        <Td>
                            <input type="number" id="rabatt" name="rabatt" step="0.01" placeholder="Rabatt" required />
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>
                            <label htmlFor="datum">Datum</label>
                        </Td>
                        <Td>
                            <input type="text" id="datum" name="datum" placeholder="Datum" required />
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>
                            <label htmlFor="rating">Rating</label>
                        </Td>
                        <Td>
                            <StarRating rating={rating} setRating={setRating} />
                        </Td>
                    </Tr>        
                    <Tr>
                        <Td>
                            <label htmlFor="lieferbar">Lieferbar</label>
                        </Td>
                        <Td>
                            <Checkbox id="lieferbar" name="lieferbar" />
                        </Td>
                    </Tr>    
                    <Tr>    
                        <Td>
                            <label htmlFor="homepage">Homepage</label>
                        </Td>
                        <Td>
                            <input type="text" id="homepage" name="homepage" placeholder="Homepage" required />
                        </Td>
                    </Tr>
                    <Tr>
                    <Td>
                <label>Schlagwörter</label>
              </Td>
              <Td>
                <CheckboxGroup>
                  <div>
                    <Checkbox value="TypeScript" id="schlagwort1" />
                    <label htmlFor="schlagwort1">TypeScript</label>
                  </div>
                  <div>
                    <Checkbox value="JavaScript" id="schlagwort2" />
                    <label htmlFor="schlagwort2">JavaScript</label>
                  </div>
                </CheckboxGroup>
              </Td>
            </Tr>  
        </Tbody> 
    </Table>
    </TableContainer>
        <div className="form-actions">
            <Button>Anlegen</Button>
        </div>
    </form>
    );
}

export function links () {
    return [{rel: "stylesheet", href: styles}]
}