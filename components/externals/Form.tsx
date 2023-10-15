'use client'

import { Dispatch, FormEvent, FormEventHandler, SetStateAction } from 'react'
import Button from './Button'
import Input from './inputs/Input'



type FormProps = {
  fields: Omit<typeFieldInput, 'setter' | 'getter'>[],
  onSubmit?: FormEventHandler<HTMLFormElement>,
  setter: Dispatch<SetStateAction<typeStateInput | ((prev: typeStateInput) => void)>>,
  getter: typeStateInput
}

function Form({ fields, onSubmit, getter, setter }: FormProps) {


  /**
   * function handler
   */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // check length invalid message
    const invalidColumns = Object.keys(getter.invalids ?? {}).filter(
      (fieldName) => (getter.invalids?.[fieldName]?.length)
    );

    // get empty required field
    const emptyFields = fields.filter((field) => {
      const isRequired = field.validations?.required
      const valueColumn = getter.values?.[field.name]
      return isRequired && !valueColumn
    });

    // do submit
    if (invalidColumns.length || emptyFields?.length) {
      // push empty field to key invalids on state
      const newInvalids = emptyFields?.reduce((resultObj, emptyField) => (
        { ...resultObj, [emptyField.name]: ['Field tidak boleh kosong!'] }
      ), {})
      setter((prev: typeStateInput) => ({ ...prev, invalids: { ...(prev.invalids), ...newInvalids } }))
    } else {
      if (onSubmit) onSubmit(event);
    }
  }



  /**
   * Rendered JSX
   */
  return (
    <form onSubmit={handleSubmit}>
      <div className='grid grid-cols-12 md:gap-2'>
        {fields.map((field, indexField: number) => {
          return (
            <div key={indexField}
              className={`${field.col ?? 'col-span-12'}`}
            >
              <Input
                {...field}
                setter={setter}
                getter={getter}
              />
            </div>
          )
        })}
      </div>
      <div className='border-t flex justify-end mt-8 pt-4 pb-8'>
        <Button
          text='Simpan'
          isLoading={getter.statusCode == 202}
        />
      </div>
    </form >
  )
}

export default Form