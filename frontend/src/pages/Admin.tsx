import { Box, Title, SimpleGrid, Stack, Skeleton } from '@mantine/core';
import { useUpcomingBookings } from '../hooks/useBookings';
import { useEventTypes } from '../hooks/useEventTypes';
import { UpcomingList } from '../components/admin/UpcomingList';
import { EventTypeForm } from '../components/admin/EventTypeForm';

export function Admin() {
  const { data: bookings, isLoading: isBookingsLoading } = useUpcomingBookings();
  const { data: eventTypes, isLoading: isEventTypesLoading } = useEventTypes();

  const eventTypeMap = eventTypes
    ? eventTypes.reduce((acc, et) => {
        acc[et.id] = et.title;
        return acc;
      }, {} as Record<string, string>)
    : {};

  return (
    <Box>
      <Title order={2} mb="xl">
        Панель администратора
      </Title>

      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="xl">
        <Stack gap="md">
          <Title order={3} size="h4">
            Предстоящие бронирования
          </Title>
          {isBookingsLoading ? (
            <Stack gap="md">
              <Skeleton height={100} radius="md" />
              <Skeleton height={100} radius="md" />
            </Stack>
          ) : (
            <UpcomingList
              bookings={bookings}
              isLoading={isBookingsLoading}
              eventTypes={eventTypeMap}
            />
          )}
        </Stack>

        <Stack gap="md">
          <Title order={3} size="h4">
            Управление услугами
          </Title>
          {isEventTypesLoading ? (
            <Skeleton height={250} radius="md" />
          ) : (
            <>
              <EventTypeForm />
              {eventTypes && eventTypes.length > 0 && (
                <Box mt="md">
                  <Title order={4} mb="md">
                    Существующие услуги ({eventTypes.length})
                  </Title>
                  {eventTypes.map((et) => (
                    <Box
                      key={et.id}
                      p="sm"
                      mb="xs"
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        border: '1px solid #E2E8F0',
                      }}
                    >
                      <Stack gap={4}>
                        <Box fw={500}>{et.title}</Box>
                        <Box c="dimmed" size="sm">{et.description}</Box>
                        <Box c="dimmed" size="xs">{et.durationMinutes} мин</Box>
                      </Stack>
                    </Box>
                  ))}
                </>
              )}
            </>
          )}
        </Stack>
      </SimpleGrid>
    </Box>
  );
}