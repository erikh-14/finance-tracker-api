import React from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button/Button";

function Form({
    handleSubmit,
    handleInput,
    inputState,
    error,
    buttonText,
    titlePlaceholder,
    amountPlaceholder,
    categories,
    icon,
}) {
    const { title, amount, date, category, description } = inputState;

    return (
        <FormStyled onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <div className="input-control">
                <input
                    type="text"
                    value={title}
                    name="title"
                    placeholder={titlePlaceholder}
                    onChange={handleInput("title")}
                />
            </div>
            <div className="input-control">
                <input
                    type="text"
                    value={amount}
                    name="amount"
                    placeholder={amountPlaceholder}
                    onChange={handleInput("amount")}
                />
            </div>
            <div className="input-control">
                <DatePicker
                    id="date"
                    selected={date}
                    placeholderText="Enter A Date"
                    dateFormat="MM/dd/yyyy"
                    onChange={(date) =>
                        handleInput("date")({ target: { value: date } })
                    }
                />
            </div>
            <div className="input-control">
                <select
                    required
                    value={category}
                    name="category"
                    onChange={handleInput("category")}
                >
                    <option value="" disabled>
                        Select Option
                    </option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat.value}>
                            {cat.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="input-control">
                <textarea
                    name="description"
                    id="description"
                    cols="30"
                    rows="4"
                    placeholder="Add A Reference"
                    value={description}
                    onChange={handleInput("description")}
                ></textarea>
            </div>
            <div className="submit-btn">
                <Button
                    name={buttonText}
                    icon={icon}
                    bPad={".8rem 1.6rem"}
                    bRad={"30px"}
                    bg={"var(--color-accent)"}
                    color={"#fff"}
                />
            </div>
        </FormStyled>
    );
}

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem;

    .input-control {
        display: flex;
        flex-direction: column;

        input,
        select,
        textarea {
            width: 100%;
            padding: 1rem;
            font-size: 1.2rem;
            border: 2px solid #ddd;
            border-radius: 8px;
            outline: none;
            background: transparent;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            color: rgba(34, 34, 96, 0.6);
            &::placeholder {
                color: rgba(34, 34, 96, 0.6);
            }
            transition: border 0.3s ease;

            &:focus {
                border: 2px solid var(--color-green);
            }
        }
    }

    .submit-btn {
        display: flex;
        justify-content: center;

        button {
            padding: 1rem 2rem;
            font-size: 1.2rem;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s ease;

            &:hover {
                background: var(--color-green) !important;
            }
        }
    }
`;

export default Form;
