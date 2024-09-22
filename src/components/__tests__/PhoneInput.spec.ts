import {mount} from '@vue/test-utils';
import {describe, it, expect, beforeEach} from 'vitest';
import PhoneInput from "../PhoneInput.vue";

describe('PhoneNumberInput.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(PhoneInput, {
      props: { modelValue: '' },
    });
  });

  it('Check if placeholder is correct with locale', () => {
    Object.defineProperty(navigator, 'language', { value: 'en-US', configurable: true });
    wrapper = mount(PhoneInput, {
      props: { modelValue: '' },
    });
    expect(wrapper.find('input').attributes('placeholder')).toBe('+1 (123) 456-7890');

    Object.defineProperty(navigator, 'language', { value: 'pl-PL', configurable: true });
    wrapper = mount(PhoneInput, {
      props: { modelValue: '' },
    });
    expect(wrapper.find('input').attributes('placeholder')).toBe('Phone number');
  });

  it('Check if only valid characters are allowed', async () => {
    await wrapper.find('input').setValue('abc+!@(48) 1$%23 ^&*456[] {}7;8:9 -');
    expect(wrapper.vm.formattedValue).toBe('+(48) 123 456 789 -');
  });

  it('Check if emits updated model value', async () => {
    await wrapper.find('input').setValue('1234567890');
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['1234567890']);
  });
});
